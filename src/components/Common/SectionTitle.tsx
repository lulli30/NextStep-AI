const SectionTitle = ({
  title,
  paragraph,
  width = "570px", // Default width if not specified
  center, // Optional prop to center the content
  mb = "100px", // Default margin bottom if not specified
}: {
  title: string; // The title text for the section
  paragraph: string; // The paragraph text for the section
  width?: string; // Optional custom width for the section
  center?: boolean; // Optional flag to center content
  mb?: string; // Optional custom margin bottom for the section
}) => {
  return (
    <>
      {/* Outer div container with conditional classes */}
      <div
        className={`w-full ${center ? "mx-auto text-center" : ""}`} // Centers the content if 'center' is true
        style={{ maxWidth: width, marginBottom: mb }} // Apply max-width and bottom margin
      >
        {/* Section title */}
        <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
          {title} {/* Display the title passed in as a prop */}
        </h2>

        {/* Paragraph text */}
        <p className="text-base !leading-relaxed text-body-color md:text-lg">
          {paragraph} {/* Display the paragraph passed in as a prop */}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
