import { NextResponse } from "next/server";
import { db, collection, getDocs, query, where } from "firebaseConfig.js"; // Ensure correct import path

export async function GET(req: Request) {
  try {
    // Extract `roadmapId` from the query parameters
    const url = new URL(req.url);
    const roadmapId = url.searchParams.get("id");

    if (!roadmapId) {
      return NextResponse.json(
        { error: "Missing roadmapId parameter" },
        { status: 400 },
      );
    }

    // Optionally validate roadmapId format if needed
    if (typeof roadmapId !== "string" || roadmapId.trim() === "") {
      return NextResponse.json(
        { error: "Invalid roadmapId format" },
        { status: 400 },
      );
    }

    // Reference to the Firestore collection
    const roadmapsRef = collection(db, "roadmaps");
    const q = query(roadmapsRef, where("roadmap_id", "==", roadmapId)); // Query based on roadmap_id
    const querySnapshot = await getDocs(q);

    // If no roadmap is found, return a 404 error
    if (querySnapshot.empty) {
      return NextResponse.json({ error: "Roadmap not found" }, { status: 404 });
    }

    // Extract the roadmap data from the query snapshot and optionally include document ID
    const roadmap = querySnapshot.docs[0].data();
    const roadmapWithId = { id: querySnapshot.docs[0].id, ...roadmap };

    return NextResponse.json(roadmapWithId);
  } catch (error) {
    console.error("Error fetching roadmap details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
