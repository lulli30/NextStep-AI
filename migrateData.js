import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Path to your users.json file
const usersFilePath = join(__dirname, "data", "users.json");

// Initialize Firebase with your web app config
const firebaseConfig = {
  apiKey: "AIzaSyCZlG9gP-IpRgP_n7CSAs6dRcTgDWH7VhM",
  authDomain: "nexstep-ai.firebaseapp.com",
  projectId: "nexstep-ai",
  storageBucket: "nexstep-ai.firebasestorage.app",
  messagingSenderId: "747560450855",
  appId: "1:747560450855:web:fa2fc175381bedba450702",
  measurementId: "G-PFTKQZRM9E",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const users = JSON.parse(await readFile(usersFilePath, "utf-8"));

// Function to migrate users to Firebase Authentication
const migrateUsersToAuth = async () => {
  for (const user of users) {
    const { email, password, username } = user;

    try {
      // Create the user in Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      console.log(`✅ User created: ${email}`);
    } catch (error) {
      console.error(`❌ Error creating user ${email}:`, error.message);
    }
  }

  console.log("User migration completed!");
};

// Run the migration for users
migrateUsersToAuth();
