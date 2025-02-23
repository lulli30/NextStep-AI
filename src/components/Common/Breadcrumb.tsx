import Link from "next/link"; // Import Link component from Next.js for navigation

// Breadcrumb component that accepts pageName and description as props
const Breadcrumb = ({
  pageName,
  description,
}: {
  pageName: string;
  description: string;
}) => {
  return (
    <>
      {/* Section that wraps the breadcrumb content, with padding and positioning */}
      <section className="relative z-10 overflow-hidden pt-28 lg:pt-[150px]">
        <div className="container">
          {" "}
          {/* Container for centering the content */}
          <div className="-mx-4 flex flex-wrap items-center">
            {" "}
            {/* Flexbox layout for responsive design */}
            {/* Left part: Page name and description */}
            <div className="w-full px-4 md:w-8/12 lg:w-7/12">
              <div className="mb-8 max-w-[570px] md:mb-0 lg:mb-12">
                <h1 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  {pageName} {/* Displays the current page's name */}
                </h1>
                <p className="text-base font-medium leading-relaxed text-body-color">
                  {description}{" "}
                  {/* Displays the description of the current page */}
                </p>
              </div>
            </div>
            {/* Right part: Breadcrumb navigation */}
            <div className="w-full px-4 md:w-4/12 lg:w-5/12">
              <div className="text-end">
                {" "}
                {/* Align breadcrumb to the right */}
                <ul className="flex items-center md:justify-end">
                  {" "}
                  {/* Flex for breadcrumb items */}
                  <li className="flex items-center">
                    {/* "Home" link, navigating back to the homepage */}
                    <Link
                      href="/"
                      className="pr-1 text-base font-medium text-body-color hover:text-primary"
                    >
                      Home
                    </Link>
                    {/* Separator between "Home" and the current page */}
                    <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-body-color"></span>
                  </li>
                  <li className="text-base font-medium text-primary">
                    {pageName}{" "}
                    {/* Displays the current page name in breadcrumb */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Background SVG elements for styling */}
        <div>
          <span className="absolute left-0 top-0 z-[-1]">
            {/* First background SVG with gradient effect */}
            <svg
              width="287"
              height="254"
              viewBox="0 0 287 254"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.1"
                d="M286.5 0.5L-14.5 254.5V69.5L286.5 0.5Z"
                fill="url(#paint0_linear_111:578)" // Gradient fill for background
              />
              <defs>
                {/* Defining the gradient for the first SVG */}
                <linearGradient
                  id="paint0_linear_111:578"
                  x1="-40.5"
                  y1="117"
                  x2="301.926"
                  y2="-97.1485"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4A6CF7" /> {/* Gradient color */}
                  <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />{" "}
                  {/* Transparent end */}
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="absolute right-0 top-0 z-[-1]">
            {/* Second background SVG with another gradient */}
            <svg
              width="628"
              height="258"
              viewBox="0 0 628 258"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.1"
                d="M669.125 257.002L345.875 31.9983L524.571 -15.8832L669.125 257.002Z"
                fill="url(#paint0_linear_0:1)" // Gradient fill for background
              />
              <path
                opacity="0.1"
                d="M0.0716344 182.78L101.988 -15.0769L142.154 81.4093L0.0716344 182.78Z"
                fill="url(#paint1_linear_0:1)" // Another gradient fill for background
              />
              <defs>
                {/* Defining two different gradients for the second SVG */}
                <linearGradient
                  id="paint0_linear_0:1"
                  x1="644"
                  y1="221"
                  x2="429.946"
                  y2="37.0429"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4A6CF7" />
                  <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_0:1"
                  x1="18.3648"
                  y1="166.016"
                  x2="105.377"
                  y2="32.3398"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#4A6CF7" />
                  <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </div>
      </section>
    </>
  );
};

export default Breadcrumb; // Export the Breadcrumb component for use in other parts of the application
