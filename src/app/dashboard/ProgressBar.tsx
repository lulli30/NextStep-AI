type ProgressBarProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="relative mb-6 w-full">
      <div className="h-4 w-full rounded-full bg-gray-300 dark:bg-gray-700">
        <div
          className="h-4 rounded-full bg-blue-500 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-gray-900 dark:text-white">
        {Math.round(progress)}% Completed
      </span>
    </div>
  );
};

export default ProgressBar;
