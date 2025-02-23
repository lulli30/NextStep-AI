import {
  SparklesIcon,
  StarIcon,
  RocketLaunchIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

const CoreValues = () => {
  return (
    <section className="values-section bg-white py-20 text-black dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-6 text-center lg:px-12">
        <h2 className="from-yellow-400 mb-6 bg-gradient-to-r bg-clip-text text-5xl font-extrabold">
          Our Core Values
        </h2>
        <ul className="mx-auto max-w-4xl space-y-6 text-left text-lg">
          <li className="flex items-start space-x-4">
            <SparklesIcon className="text-yellow-400 h-8 w-8" />
            <div>
              <strong className="text-xl font-semibold">
                Personalization:
              </strong>
              <p className="text-lg">
                Every career journey is unique. We focus on tailoring each
                roadmap to the individual.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <StarIcon className="text-yellow-400 h-8 w-8" />
            <div>
              <strong className="text-xl font-semibold">Clarity:</strong>
              <p className="text-lg">
                We break down complex career paths into manageable, actionable
                steps.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <RocketLaunchIcon className="text-yellow-400 h-8 w-8" />
            <div>
              <strong className="text-xl font-semibold">Innovation:</strong>
              <p className="text-lg">
                We leverage cutting-edge AI to provide the most accurate and
                forward-thinking career guidance.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <HandThumbUpIcon className="text-yellow-400 h-8 w-8" />
            <div>
              <strong className="text-xl font-semibold">Support:</strong>
              <p className="text-lg">
                Our platform is built to provide continuous support as users
                progress toward their career goals.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CoreValues;
