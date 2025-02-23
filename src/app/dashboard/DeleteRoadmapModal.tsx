import { motion } from "framer-motion";

const DeleteRoadmapModal = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDeleteRoadmap,
  roadmapId,
}) => {
  return (
    showDeleteModal && (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="max-h-[90vh] w-full max-w-lg transform overflow-y-auto rounded-lg bg-white transition-all duration-300 ease-in-out dark:bg-gray-800"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <div className="mb-4 text-xl font-bold dark:text-white">
              Are you sure you want to delete this roadmap?
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-lg bg-gray-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-600"
              >
                No
              </button>
              <button
                onClick={() => {
                  handleDeleteRoadmap(roadmapId);
                  setShowDeleteModal(false);
                }}
                className="rounded-lg bg-red-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  );
};

export default DeleteRoadmapModal;
