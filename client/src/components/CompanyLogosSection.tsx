import React, { useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import axios from 'axios';
import { Company } from '../types/Company';
import { CompanyLogo } from './CompanyLogo';
import { CompanyLogosSkeletonGrid } from './CompanyLogoSkeleton';
import { useResponsive } from '../hooks/useResponsive';
import { logResponsiveTest } from '../utils/responsiveTest';

// Import error handling test utilities in development
if (process.env.NODE_ENV === 'development') {
    import('../utils/testErrorHandling');
}

/**
 * Company Logos section component that displays a grid of company logos
 * positioned between About Me and Projects sections
 */
export const CompanyLogosSection: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const shouldReduceMotion = useReducedMotion();
    const { isMobile, isTouchDevice } = useResponsive();

    // Fetch companies data with retry functionality
    const fetchCompanies = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Add timeout to handle slow network connections
            const response = await axios.get('/api/companies', {
                timeout: 10000, // 10 second timeout
            });

            setCompanies(response.data || []);
            setRetryCount(0); // Reset retry count on success
        } catch (error) {
            console.error('Error fetching companies:', error);

            // Provide more specific error messages
            let errorMessage = 'Failed to load company logos';
            if (axios.isAxiosError(error)) {
                if (error.code === 'ECONNABORTED') {
                    errorMessage = 'Request timed out. Please check your connection.';
                } else if (error.response?.status === 404) {
                    errorMessage = 'Company data not found.';
                } else if (error.response && error.response.status >= 500) {
                    errorMessage = 'Server error. Please try again later.';
                } else if (!navigator.onLine) {
                    errorMessage = 'No internet connection. Please check your network.';
                }
            }

            setError(errorMessage);
            setCompanies([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Retry function for manual retry attempts
    const handleRetry = useCallback(() => {
        if (retryCount < 3) { // Limit retry attempts
            setRetryCount(prev => prev + 1);
            fetchCompanies();
        }
    }, [fetchCompanies, retryCount]);

    // Fetch companies data on component mount and when retry is triggered
    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    // Run responsive test in development mode
    useEffect(() => {
        if (process.env.NODE_ENV === 'development' && !loading && companies.length > 0) {
            // Delay test to ensure DOM is fully rendered
            const timer = setTimeout(() => {
                logResponsiveTest();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [loading, companies]);

    // Enhanced animation variants with reduced motion support and mobile optimization
    const containerVariants = {
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0
        },
        visible: {
            opacity: 1,
            transition: shouldReduceMotion ? {} : {
                staggerChildren: isMobile ? 0.05 : 0.08, // Faster stagger on mobile
                delayChildren: isMobile ? 0.1 : 0.3, // Shorter delay on mobile
                duration: isMobile ? 0.4 : 0.6, // Faster animation on mobile
                ease: "easeOut"
            }
        }
    };

    // Enhanced individual logo animation variants with mobile optimization
    const logoVariants = {
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            y: shouldReduceMotion ? 0 : (isMobile ? 20 : 30), // Smaller movement on mobile
            scale: shouldReduceMotion ? 1 : (isMobile ? 0.9 : 0.8) // Less scale change on mobile
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: shouldReduceMotion ? {} : {
                duration: isMobile ? 0.4 : 0.6, // Faster on mobile
                ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth entrance
                type: "spring",
                stiffness: isMobile ? 120 : 100, // Slightly stiffer on mobile
                damping: isMobile ? 18 : 15 // More damping on mobile
            }
        }
    };

    // Header animation variants
    const headerVariants = {
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            y: shouldReduceMotion ? 0 : -30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: shouldReduceMotion ? {} : {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    // Subtitle animation variants
    const subtitleVariants = {
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            y: shouldReduceMotion ? 0 : -20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: shouldReduceMotion ? {} : {
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut"
            }
        }
    };

    return (
        <section
            id="companies"
            className="py-12 sm:py-16 md:py-20 bg-gray-50 relative overflow-hidden"
            aria-labelledby="companies-heading"
            style={{
                // Ensure section adapts to orientation changes
                minHeight: isMobile ? 'auto' : undefined,
            }}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <motion.h2
                        id="companies-heading"
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4"
                        variants={headerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            margin: isMobile ? "-20px" : "-50px",
                            amount: isMobile ? 0.2 : 0.3
                        }}
                    >
                        Trusted by Leading a Companies
                    </motion.h2>
                    <motion.p
                        className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 sm:px-0"
                        variants={subtitleVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            margin: isMobile ? "-20px" : "-50px",
                            amount: isMobile ? 0.2 : 0.3
                        }}
                    >
                        I've had the privilege of working with innovative companies across various industries,
                        creating impactful user experiences that drive business success.
                    </motion.p>
                </div>

                {/* Loading State with Skeleton */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CompanyLogosSkeletonGrid />
                        <motion.div
                            className="flex justify-center items-center mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                                <p className="text-gray-600 text-sm">
                                    Loading company logos...
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Enhanced Error State with Retry */}
                {error && !loading && (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Unable to Load Company Logos
                        </h3>
                        <p className="text-gray-600 text-base mb-4 max-w-md mx-auto">{error}</p>

                        {retryCount < 3 && (
                            <motion.button
                                onClick={handleRetry}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 mb-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                            >
                                {loading ? 'Retrying...' : 'Try Again'}
                            </motion.button>
                        )}

                        {retryCount >= 3 && (
                            <p className="text-gray-500 text-sm">
                                Maximum retry attempts reached. Please refresh the page or try again later.
                            </p>
                        )}

                        {retryCount > 0 && retryCount < 3 && (
                            <p className="text-gray-500 text-sm mt-2">
                                Attempt {retryCount + 1} of 3
                            </p>
                        )}
                    </motion.div>
                )}

                {/* Companies Grid */}
                {!loading && !error && companies.length > 0 && (
                    <motion.div
                        className="company-logos-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            margin: isMobile ? "-40px" : "-80px", // Trigger animations earlier on mobile
                            amount: isMobile ? 0.1 : 0.3 // Less of the element needs to be visible on mobile
                        }}
                    >
                        {companies.map((company, index) => (
                            <motion.div
                                key={company.id}
                                variants={logoVariants}
                            >
                                <CompanyLogo
                                    company={company}
                                    index={index}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Enhanced Empty State */}
                {!loading && !error && companies.length === 0 && (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No Company Logos Available
                        </h3>
                        <p className="text-gray-600 text-base mb-4 max-w-md mx-auto">
                            Company logos will appear here once they are added to the portfolio.
                        </p>
                        <motion.button
                            onClick={handleRetry}
                            className="px-4 py-2 text-blue-500 hover:text-blue-600 transition-colors duration-200 text-sm"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Refresh
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default CompanyLogosSection;