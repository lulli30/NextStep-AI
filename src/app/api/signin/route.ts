import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import * as cookie from "cookie";
import validator from "validator";
import { db, collection, getDocs, query, where } from "firebaseConfig.js";

const rateLimitStore = new Map(); // In-memory store for rate limiting

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Rate limiting logic
    const ip = req.headers.get("x-forwarded-for") || req.ip;
    const now = Date.now();

    if (rateLimitStore.has(ip)) {
      const { attempts, lastAttempt } = rateLimitStore.get(ip);

      if (attempts >= 5 && now - lastAttempt < 15 * 60 * 1000) {
        return NextResponse.json(
          { message: "Too many login attempts. Try again later." },
          { status: 429 },
        );
      }

      rateLimitStore.set(ip, {
        attempts: attempts + 1,
        lastAttempt: now,
      });
    } else {
      rateLimitStore.set(ip, { attempts: 1, lastAttempt: now });
    }

    // Input validation
    if (!email || !password || !validator.isEmail(email)) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 },
      );
    }

    // Check if user exists in Firestore
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 },
      );
    }

    // Retrieve user data
    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data();

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 },
      );
    }

    // Reset login attempts on successful login
    rateLimitStore.delete(ip);

    // Prepare user session data (excluding password)
    const userData = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
    };

    // Serialize user session in a secure cookie
    const serialized = cookie.serialize(
      "user_session",
      JSON.stringify(userData),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/",
      },
    );

    // Set the cookie and return success response
    const res = NextResponse.json({
      message: "Login successful",
      user: userData,
    });
    res.headers.set("Set-Cookie", serialized);

    return res;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
