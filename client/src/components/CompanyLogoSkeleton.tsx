import React from 'react';
import { motion } from 'framer-motion';

/**
 * Skeleton loader component that mimics the company logo layout
 */
export const CompanyLogoSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-6">
            <div className="w-full h-12 sm:h-14 md:h-16 flex items-center justify-center">
                <motion.div
                    className="w-20 h-8 bg-gray-200 rounded"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </div>
    );
};

/**
 * Grid of skeleton loaders that matches the responsive layout
 */
export const CompanyLogosSkeletonGrid: React.FC = () => {
    // Create array of 12 skeleton items to fill the grid
    const skeletonItems = Array.from({ length: 12 }, (_, index) => index);

    return (
        <div className="company-logos-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
            {skeletonItems.map((index) => (
                <CompanyLogoSkeleton key={`skeleton-${index}`} />
            ))}
        </div>
    );
};

export default CompanyLogoSkeleton;