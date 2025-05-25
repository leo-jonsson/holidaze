import React from "react";

interface ProgressProps {
  value: number; // The current step number
  max: number; // The total number of steps
}

const Progress: React.FC<ProgressProps> = ({ value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
      <div
        className="h-full bg-primary transition-all duration-300 ease-in-out" // Add transition for smooth movement
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export { Progress };
