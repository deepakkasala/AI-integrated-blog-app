import React from "react";
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-gray-900 dark:border-t-white border-gray-300 dark:border-gray-600 shadow-lg"></div>
    </div>
  );
};
export default Loader;
