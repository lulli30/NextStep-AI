import { NextResponse } from "next/server";
import * as cookie from "cookie"; // Correct import for cookie module

export async function GET() {
  try {
    // Create the response to indicate user logged out
    const res = NextResponse.json({ message: "Logged out successfully" });

    // Clear the user session cookie by setting maxAge to -1
    res.headers.set(
      "Set-Cookie",
      cookie.serialize("user_session", "", {
        httpOnly: true, // Ensures the cookie cannot be accessed via JavaScript
        secure: process.env.NODE_ENV === "production", // Use secure cookies only in production
        maxAge: -1, // Immediately expire the cookie
        path: "/", // Make the cookie available across the entire site
      }),
    );

    return res;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
