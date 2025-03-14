import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { db, collection, addDoc } from "firebaseConfig"; // Adjust this import to your Firestore config

const apiKey = process.env.GEMINI_API_KEY;

export async function GET(req: NextRequest) {
  try {
    const prompt = req.nextUrl.searchParams.get("prompt");
    const userEmail = req.nextUrl.searchParams.get("userEmail");

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 },
      );
    }
    if (!userEmail) {
      return NextResponse.json(
        { error: "User email is required." },
        { status: 400 },
      );
    }

    // Updated API Prompt to include a career description
    const apiPrompt = `
      Provide a step-by-step roadmap on how to become a ${prompt}. 
      - First, provide a one-sentence description of this career.
      - Then, list detailed steps, where each step includes:
        - A title (e.g., "Learn HTML and CSS")
        - A brief description (e.g., "Understand the basics of web structure and styling.")
        - At least three resource links formatted as: "[Resource Name](https://link.com)"
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      { contents: [{ role: "user", parts: [{ text: apiPrompt }] }] },
    );

    if (!response.data?.candidates || response.data.candidates.length === 0) {
      throw new Error("Invalid response from Gemini API.");
    }

    let data = response.data.candidates[0]?.content?.parts[0]?.text;
    if (!data) throw new Error("Empty response from Gemini API.");

    // Remove "1-Sentence Description:" if present
    data = data.replace(/\*\*1-Sentence Description:\*\*[\s\S]*?\n/, "").trim();
    data = data.replace(/- Resources:[\s\S]*?(?=\n\n|$)/g, "").trim();

    // Extract Career Title (First Sentence)
    const firstLineEnd = data.indexOf("\n");
    const careerDescription =
      firstLineEnd !== -1 ? data.substring(0, firstLineEnd).trim() : prompt;

    // **Step Extraction and Auto-Fixing Logic**
    const steps = [];
    const stepRegex =
      /(?:\d+\.\s|\*\*)?(.*?)\*\*?\n([\s\S]*?)(?=\n\s*(?:\d+\.|\*\*|$))/g;
    let match;

    while ((match = stepRegex.exec(data)) !== null) {
      let stepTitle = match[1].trim();
      let description = "";
      let resourceLinks = [];

      // Remove numbering from step titles if present
      stepTitle = stepTitle.replace(/^\d+\.\s*/, "");

      // Extract all markdown-style links properly
      const linksRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
      let linksMatch;
      while ((linksMatch = linksRegex.exec(match[2])) !== null) {
        resourceLinks.push(`[${linksMatch[1]}](${linksMatch[2]})`);
      }

      // Remove extracted links from the description to clean it up
      description = match[2].replace(linksRegex, "").trim();

      // Fix formatting issues in descriptions
      description = description
        .replace(/\*\s+/g, "- ")
        .replace(/\*\*/g, "")
        .trim();

      steps.push({
        step_id: (steps.length + 1).toString(),
        title: stepTitle,
        description,
        resource_links: resourceLinks,
      });
    }

    if (steps.length === 0) {
      throw new Error("Failed to parse roadmap steps.");
    }

    const newRoadmap = {
      roadmap_id: Date.now().toString(),
      user_email: userEmail,
      career_path: prompt,
      title: careerDescription, // Using extracted career description
      steps,
      created_at: new Date().toISOString(),
    };

    // **Save Roadmap to Firestore**
    const roadmapsRef = collection(db, "roadmaps");
    await addDoc(roadmapsRef, newRoadmap); // Add the new roadmap to Firestore

    return NextResponse.json(newRoadmap);
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
