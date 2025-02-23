import { NextResponse } from "next/server";
import {
  db,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebaseConfig.js"; // Ensure path is correct

export async function POST(req: Request) {
  try {
    const { roadmapId } = await req.json();

    if (!roadmapId) {
      return NextResponse.json(
        { message: "Roadmap ID is required" },
        { status: 400 },
      );
    }

    // Fetch roadmaps collection from Firestore
    const roadmapsRef = collection(db, "roadmaps");
    const q = query(roadmapsRef, where("roadmap_id", "==", roadmapId));
    const querySnapshot = await getDocs(q);

    // If roadmap is not found
    if (querySnapshot.empty) {
      return NextResponse.json(
        { message: "Roadmap not found" },
        { status: 404 },
      );
    }

    // Delete the roadmap document
    const roadmapDoc = querySnapshot.docs[0]; // Get the first matching document
    await deleteDoc(doc(db, "roadmaps", roadmapDoc.id)); // Delete by doc ID

    return NextResponse.json(
      { message: "Roadmap deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting roadmap:", error);
    return NextResponse.json(
      { message: "Failed to delete roadmap" },
      { status: 500 },
    );
  }
}
