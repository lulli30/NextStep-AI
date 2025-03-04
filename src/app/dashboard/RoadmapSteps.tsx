import { FiCheckCircle } from "react-icons/fi";

type Step = {
  step_id: number;
  title: string;
  description: string;
  resource_links?: string[];
};

type RoadmapStepsProps = {
  steps: Step[];
  completedSteps: number[];
  markStepAsDone: (stepId: number) => void;
};

const RoadmapSteps = ({
  steps,
  completedSteps,
  markStepAsDone,
}: RoadmapStepsProps) => {
  return (
    <div className="relative border-l-4 border-blue-500 pl-6 dark:border-blue-400">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.step_id);

        return (
          <div key={step.step_id} className="relative mb-10">
            {/* Step Marker */}
            <div
              className={`absolute -left-[30px] top-2 flex h-10 w-10 items-center justify-center rounded-full border-4 text-white ${
                isCompleted
                  ? "border-green-500 bg-green-500"
                  : "border-blue-500 bg-white text-blue-500 dark:border-blue-400 dark:bg-gray-900"
              }`}
            >
              {isCompleted ? <FiCheckCircle className="h-6 w-6" /> : index + 1}
            </div>

            {/* Step Content */}
            <div className="rounded-lg bg-white p-5 shadow-lg transition-all dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <button
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-white transition-all ${
                    isCompleted ? "bg-green-500" : "bg-blue-600"
                  } hover:opacity-80`}
                  onClick={() => markStepAsDone(step.step_id)}
                >
                  {isCompleted ? (
                    <>
                      <FiCheckCircle className="h-5 w-5" />
                      <span>Completed</span>
                    </>
                  ) : (
                    "Mark as Done"
                  )}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {step.description}
              </p>

              {/* Resource Links */}
              {step.resource_links?.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-300">
                    Resources:
                  </h4>
                  <ul className="mt-1 list-disc pl-5 text-blue-600 dark:text-blue-400">
                    {step.resource_links.map((link, idx) => {
                      const regex = /\[(.*?)\]\((.*?)\)/;
                      const match = link.match(regex);
                      return (
                        <li key={idx}>
                          <a
                            href={match ? match[2] : link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition hover:text-blue-800 dark:hover:text-blue-300"
                          >
                            {match ? match[1] : link}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoadmapSteps;
