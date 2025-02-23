import { NextResponse } from "next/server";
import { db, collection, getDocs, query, where } from "firebaseConfig.js";

export async function GET(req: Request) {
  try {
    // Extract user email from query parameters
    const url = new URL(req.url);
    const userEmail = url.searchParams.get("email");

    if (!userEmail) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    console.log("Fetching roadmaps for user:", userEmail); // Debugging log

    // Reference to the Firestore collection
    const roadmapsRef = collection(db, "roadmaps");
    const q = query(roadmapsRef, where("user_email", "==", userEmail)); // Filter roadmaps by user_email

    const querySnapshot = await getDocs(q);

    // If no roadmaps found for this user, return an empty array
    if (querySnapshot.empty) {
      console.log("No roadmaps found for user:", userEmail); // Debugging log
      return NextResponse.json([], { status: 200 });
    }

    // Extract the roadmaps from the query snapshot
    const userRoadmaps = querySnapshot.docs.map((doc) => doc.data());
    console.log("Fetched roadmaps:", userRoadmaps); // Debugging log

    return NextResponse.json(userRoadmaps);
  } catch (error) {
    console.error("Error fetching roadmaps:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
