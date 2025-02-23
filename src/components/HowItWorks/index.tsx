import SectionTitle from "../Common/SectionTitle"; // Importing SectionTitle component for the header of the section
import SingleSteps from "./SingleSteps"; // Importing SingleFeature to display individual feature details
import stepsData from "./stepsData"; // Importing the data for features

// Features Component
const Features = () => {
  return (
    <>
      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 lg:py-28">
        {/* Container for the section content */}
        <div className="container mx-auto px-4">
          {/* Section Title with centered text */}
          <SectionTitle
            title="How it Works" // The main title of the section
            paragraph="Explore the steps and process." // The description for the section
            center // Centers the title and paragraph
          />

          {/* Grid Layout for features */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {/* Iterating through featuresData to render each feature */}
            {stepsData.map((feature, index) => (
              <div
                key={feature.id} // Assigning a unique key for each feature item
                className="flex transform flex-col items-center space-y-4 rounded-lg bg-white p-6 pt-16 text-center shadow-lg transition-transform hover:scale-105 hover:shadow-xl dark:bg-gray-dark"
              >
                {/* Step Number (Displayed as a circle with the number inside) */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                  {index + 1}{" "}
                  {/* Display the step number, adding 1 because index starts from 0 */}
                </div>

                {/* Feature Details */}
                <div className="flex-grow">
                  {/* Display the feature details using SingleFeature component */}
                  <SingleSteps feature={feature} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
