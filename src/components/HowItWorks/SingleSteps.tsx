import { Steps } from "@/types/steps"; // Importing the 'Feature' type for type safety

// SingleFeature component
const SingleFeature = ({ feature }: { feature: Steps }) => {
  const { icon, title, paragraph } = feature; // Destructuring the feature object to get the icon, title, and paragraph

  return (
    <div className="w-full">
      {" "}
      {/* Container for the feature */}
      <div className="wow fadeInUp" data-wow-delay=".15s">
        {" "}
        {/* Animation class for fade-in effect with delay */}
        {/* Icon Container */}
        <div className="mx-auto mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
          {icon} {/* Displaying the icon */}
        </div>
        {/* Feature Title */}
        <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
          {title} {/* Displaying the title */}
        </h3>
        {/* Feature Description */}
        <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
          {paragraph} {/* Displaying the description paragraph */}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature; // Exporting the component for use in other parts of the app
