import { motion } from "framer-motion";
import { X, Loader } from "lucide-react";

const CreateRoadmapModal = ({
  showModal,
  setShowModal,
  handleGenerateRoadmap,
  aiPrompt,
  setAiPrompt,
  isGenerating,
  errorMessage,
  generatedRoadmap,
  showSuccessModal,
  setShowSuccessModal,
  handleSaveRoadmap,
}) => {
  return (
    showModal && (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="relative max-h-[90vh] w-full max-w-lg transform overflow-y-auto rounded-lg bg-white transition-all duration-300 ease-in-out dark:bg-gray-800"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute right-4 top-4 rounded-full bg-gray-300 p-2 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <X className="h-5 w-5 text-black dark:text-white" />
          </button>

          <div className="p-6">
            <div className="mb-4 text-xl font-bold dark:text-white">
              Generate New Roadmap
            </div>
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="mb-4 w-full rounded-lg border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              placeholder="Enter a prompt for your roadmap"
              aria-label="Roadmap Prompt"
            />
            <div className="mt-4">
              <button
                onClick={handleGenerateRoadmap}
                disabled={isGenerating}
                className="w-full rounded-lg bg-blue-500 p-2 text-white disabled:bg-gray-400"
              >
                {isGenerating ? (
                  <Loader className="inline-block h-5 w-5 animate-spin" />
                ) : (
                  "Generate Roadmap"
                )}
              </button>
              {errorMessage && (
                <div className="mt-2 text-red-500">{errorMessage}</div>
              )}
            </div>
            {generatedRoadmap && (
              <div className="mt-6">
                <h3 className="text-lg font-bold dark:text-white">
                  Generated Roadmap
                </h3>
                <div className="mt-4">
                  <p className="text-sm dark:text-white">
                    <strong>Title:</strong> {generatedRoadmap.title}
                  </p>
                  <p className="text-sm dark:text-white">
                    <strong>Description:</strong> {generatedRoadmap.career_path}
                  </p>
                  {generatedRoadmap.steps && (
                    <div className="mt-4">
                      <h4 className="font-semibold dark:text-white">Steps:</h4>
                      <ul className="list-disc pl-5 dark:text-white">
                        {generatedRoadmap.steps.map((step, index) => (
                          <li key={index}>{step.title}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-lg bg-gray-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-600"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowSuccessModal(true);
                      setShowModal(false);
                      handleSaveRoadmap();
                    }}
                    className="rounded-lg bg-green-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-green-600"
                  >
                    Save Roadmap
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    )
  );
};

export default CreateRoadmapModal;
