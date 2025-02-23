"use client"; // Indicates this component is intended for client-side rendering in Next.js

import { useEffect } from "react"; // Import useEffect hook from React

export default function ScrollUp() {
  // useEffect runs after the component is mounted
  useEffect(() => {
    // Scrolls the document to the top (coordinates 0, 0)
    window.document.scrollingElement?.scrollTo(0, 0);
  }, []); // Empty dependency array means this effect runs only once on mount

  return null; // This component does not render anything visible
}
