import { motion } from "framer-motion";

const SuccessModal = ({ showSuccessModal, setShowSuccessModal }) => {
  if (!showSuccessModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="w-full max-w-sm rounded-lg bg-green-500 p-6 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-lg font-bold">Success!</div>
        <p>Roadmap has been successfully generated. Please refresh the page.</p>
        <button
          onClick={() => {
            setShowSuccessModal(false);
            window.location.reload();
          }}
          className="mt-4 rounded-lg bg-green-700 px-4 py-2"
        >
          Refresh
        </button>
      </motion.div>
    </div>
  );
};

export default SuccessModal;
