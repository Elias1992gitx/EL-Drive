import React from 'react';
import { motion } from 'framer-motion';

const Card: React.FC = () => {
  const title = 'Card Title';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6
        hover:shadow-md transition-all duration-200 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="text-sm sm:text-base font-medium text-gray-900 truncate">
            {title}
          </div>
        </div>
      </div>
      {/* Card content */}
    </motion.div>
  );
};

export default Card; 