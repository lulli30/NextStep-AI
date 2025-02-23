import { NextResponse } from "next/server";
import * as cookie from "cookie";
import { db, collection, getDocs, query, where } from "firebaseConfig.js"; // Ensure the correct import

export async function GET(req) {
  try {
    // Parse the user session from cookies
    const cookieHeader = req.headers.get("cookie");
    const cookies = cookieHeader ? cookie.parse(cookieHeader) : {};
    const userSession = cookies["user_session"];

    if (!userSession) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    // Parse the user session to get user data (e.g., user_id)
    const userData = JSON.parse(userSession);

    // Query Firestore to fetch the user profile based on user_id
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("user_id", "==", userData.user_id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Extract user data from Firestore document
    const userDoc = querySnapshot.docs[0];
    const userProfile = userDoc.data();

    return NextResponse.json({
      user_id: userProfile.user_id,
      username: userProfile.username,
      email: userProfile.email,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
