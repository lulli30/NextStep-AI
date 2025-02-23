import { Steps } from "@/types/steps"; // Importing the 'Steps' type for type safety

// Creating the 'featuresData' array, which contains information about each feature in the job roadmap
const featuresData: Steps[] = [
  {
    id: 1, // Unique identifier for the feature
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" className="fill-current">
        <path d="M10 2a8 8 0 106.32 12.906l4.387 4.387a1 1 0 001.415-1.415l-4.387-4.387A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
      </svg>
    ), // Icon for the "Search a Job" feature (SVG format)
    title: "Search a Job", // Title of the feature
    paragraph:
      "Select a job that aligns with your career goals or personal interests.", // Description of the feature
  },
  {
    id: 2, // Unique identifier for the feature
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path
          opacity="0.5"
          d="M20 30C22.75 30 25 32.25 25 35C25 37.75 22.75 40 20 40C17.25 40 15 37.75 15 35C15 32.25 17.25 30 20 30ZM35 30C37.75 30 40 32.25 40 35C40 37.75 37.75 40 35 40C32.25 40 30 37.75 30 35C30 32.25 32.25 30 35 30ZM35 15C37.75 15 40 17.25 40 20C40 22.75 37.75 25 35 25C32.25 25 30 22.75 30 20C30 17.25 32.25 15 35 15Z"
        />
        <path d="M20 15C22.75 15 25 17.25 25 20C25 22.75 22.75 25 20 25C17.25 25 15 22.75 15 20C15 17.25 17.25 15 20 15ZM20 0C22.75 0 25 2.25 25 5C25 7.75 22.75 10 20 10C17.25 10 15 7.75 15 5C15 2.25 17.25 0 20 0ZM5 30C7.75 30 10 32.25 10 35C10 37.75 7.75 40 5 40C2.25 40 0 37.75 0 35C0 32.25 2.25 30 5 30ZM5 15C7.75 15 10 17.25 10 20C10 22.75 7.75 25 5 25C2.25 25 0 22.75 0 20C0 17.25 2.25 15 5 15ZM5 0C7.75 0 10 2.25 10 5C10 7.75 7.75 10 5 10C2.25 10 0 7.75 0 5C0 2.25 2.25 0 5 0ZM35 0C37.75 0 40 2.25 40 5C40 7.75 37.75 10 35 10C32.25 10 30 7.75 30 5C30 2.25 32.25 0 35 0Z" />
      </svg>
    ), // Icon for the "Get a roadmap" feature (SVG format)
    title: "Get a roadmap", // Title of the feature
    paragraph:
      "NextStep AI creates a personalized job roadmap, organized into main objectives and essential action steps.", // Description of the feature
  },
  {
    id: 3, // Unique identifier for the feature
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" className="fill-current">
        <path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10 10 10 0 00-10-10zm0 2a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8zm-1 3v6h6v-2h-4v-4h-2z" />
      </svg>
    ), // Icon for the "Track your progress" feature (SVG format)
    title: "Track your progress", // Title of the feature
    paragraph:
      "Track each completed step to visualize your progress on the roadmap, showcasing your advancements in the job roadmap journey.", // Description of the feature
  },
  {
    id: 4, // Unique identifier for the feature
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" className="fill-current">
        <path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10 10 10 0 00-10-10zm0 2a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8zm-1 3v6h6v-2h-4v-4h-2z" />
      </svg>
    ), // Icon for the "Explore Resources" feature (SVG format)
    title: "Explore Resources", // Title of the feature
    paragraph:
      "Every tech job consists of links to external resources, tutorials, certifications, and more to help you learn and grow.", // Description of the feature
  },
];

// Exporting the featuresData array to be used in other parts of the application
export default featuresData;
