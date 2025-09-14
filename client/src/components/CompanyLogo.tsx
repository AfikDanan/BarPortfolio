import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Company } from '../types/Company';
import '../styles/responsive.css';

interface CompanyLogoProps {
    /** Company data object containing logo and metadata */
    company: Company;
    /** Index for potential staggered animations */
    index: number;
}

/**
 * Individual company logo component with hover effects and accessibility features
 */
export const CompanyLogo: React.FC<CompanyLogoProps> = ({ company, index }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const handleImageError = () => {
        setImageError(true);
        console.warn(`Failed to load logo for ${company.name}: ${company.logoUrl}`);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    // Use provided alt text or fallback to company name
    const altText = company.altText || `${company.name} logo`;

    // Animation variants for the logo container
    const containerVariants = {
        initial: {
            scale: 1,
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
        },
        hover: shouldReduceMotion ? {} : {
            scale: 1.03,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        },
        tap: shouldReduceMotion ? {} : {
            scale: 0.95,
            transition: {
                duration: 0.15,
                ease: "easeInOut"
            }
        }
    };

    // Animation variants for the logo image
    const imageVariants = {
        initial: {
            opacity: 1,
            filter: "grayscale(0%)"
        },
        hover: shouldReduceMotion ? {} : {
            opacity: 0.9,
            filter: "grayscale(20%)",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            className="company-logo-container group relative bg-white rounded-lg border border-gray-200 p-3 sm:p-4 md:p-6 cursor-pointer overflow-hidden touch-manipulation"
            role="img"
            aria-label={`Company logo for ${company.name}`}
            variants={containerVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            tabIndex={0}
        >
            {!imageError ? (
                <div className="relative w-full h-12 sm:h-14 md:h-16 flex items-center justify-center">
                    <motion.img
                        src={company.logoUrl}
                        alt={altText}
                        className={`company-logo-image max-w-full max-h-full object-contain ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        variants={imageVariants}
                        initial="initial"
                        whileHover="hover"
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                        loading="lazy"
                    />
                    {/* Loading placeholder with animation */}
                    {!imageLoaded && !imageError && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        </motion.div>
                    )}

                    {/* Subtle background glow effect on hover */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg opacity-0"
                        initial={{ opacity: 0 }}
                        whileHover={shouldReduceMotion ? {} : {
                            opacity: 0.3,
                            transition: { duration: 0.3 }
                        }}
                    />
                </div>
            ) : (
                /* Fallback display when image fails to load */
                <motion.div
                    className="w-full h-12 sm:h-14 md:h-16 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="text-center">
                        <motion.div
                            className="company-logo-fallback-text text-gray-600 font-medium text-sm leading-tight"
                            initial={{ y: 5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                        >
                            {company.name}
                        </motion.div>
                        <motion.div
                            className="text-xs text-gray-400 mt-1"
                            initial={{ y: 5, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                        >
                            Logo unavailable
                        </motion.div>
                    </div>
                </motion.div>
            )}

            {/* Screen reader only company name for additional context */}
            <span className="sr-only">
                {company.name}
            </span>

            {/* Subtle border animation on hover */}
            <motion.div
                className="absolute inset-0 rounded-lg border-2 border-transparent"
                whileHover={shouldReduceMotion ? {} : {
                    borderColor: "rgba(59, 130, 246, 0.2)",
                    transition: { duration: 0.2 }
                }}
            />
        </motion.div>
    );
};

export default CompanyLogo;