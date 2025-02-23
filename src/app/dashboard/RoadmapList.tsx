import { Trash2, ArrowRightCircle } from "lucide-react";
import { motion } from "framer-motion";

const RoadmapList = ({
  roadmaps,
  progressData,
  handleViewDetails,
  setSelectedRoadmap,
  setShowDeleteModal,
}) => {
  if (roadmaps.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500 dark:text-gray-400">
        <p>No roadmaps yet. Create a new one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {roadmaps.map((roadmap) => (
        <motion.div
          key={roadmap.roadmap_id}
          className="flex flex-col justify-between rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800"
          whileHover={{ scale: 1.02 }}
        >
          {/* Title with Icon */}
          <div className="flex items-center gap-2">
            <ArrowRightCircle className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {roadmap.career_path}
            </h3>
          </div>

          {/* Description */}
          <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
            {roadmap.title}
          </p>

          {/* Spacer to push content up */}
          <div className="flex-grow"></div>

          {/* Progress Bar */}
          <div className="relative z-10 mt-4 h-4 w-full rounded-full bg-gray-300 dark:bg-gray-700">
            <motion.div
              className="h-4 rounded-full bg-blue-500"
              style={{ width: `${progressData[roadmap.roadmap_id] || 0}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progressData[roadmap.roadmap_id] || 0}%` }}
              transition={{ duration: 0.5 }}
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-gray-900 dark:text-white">
              {Math.round(progressData[roadmap.roadmap_id] || 0)}%
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => handleViewDetails(roadmap)}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-600"
            >
              View Details
              <ArrowRightCircle className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setSelectedRoadmap(roadmap);
                setShowDeleteModal(true);
              }}
              className="ml-2 rounded-md p-2 text-red-600 transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-800"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RoadmapList;
