import bcrypt from "bcryptjs";
import {
  db,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebaseConfig.js"; // Update path if needed

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Basic input validation
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: "All fields are required." }),
        { status: 400 },
      );
    }

    // Validate email format (basic check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ message: "Invalid email format." }),
        { status: 400 },
      );
    }

    // Check if the user already exists
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return new Response(
        JSON.stringify({
          message: "This account has already been registered.",
        }),
        { status: 400 },
      );
    }

    // Hash password asynchronously
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user object
    const newUser = {
      user_id: Date.now().toString(),
      username: name,
      email,
      password: hashedPassword,
      created_at: new Date().toISOString(),
    };

    // Save user to Firestore
    await addDoc(usersRef, newUser);

    return new Response(
      JSON.stringify({ message: "Account created successfully!" }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to create account. Please try again.",
      }),
      { status: 500 },
    );
  }
}
