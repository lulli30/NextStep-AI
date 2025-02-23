import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import * as cookie from "cookie";
import { db, collection, getDocs, query, where } from "firebaseConfig.js"; // Ensure the path is correct

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Check if user exists in Firestore
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // Retrieve user data
    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data();

    // Verify password asynchronously
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 400 },
      );
    }

    // Prepare user session data (excluding password)
    const userData = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
    };

    // Serialize user session in a cookie
    const serialized = cookie.serialize(
      "user_session",
      JSON.stringify(userData),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure cookies in production
        maxAge: 60 * 60 * 24, // 1 day
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
