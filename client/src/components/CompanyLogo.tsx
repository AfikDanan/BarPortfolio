import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Company } from '../types/Company';

interface CompanyLogoProps {
    /** Company data object containing logo and metadata */
    company: Company;
    /** Index for potential staggered animations */
    index: number;
}

/**
 * Individual company logo component - simplified version with no borders or backgrounds
 */
export const CompanyLogo: React.FC<CompanyLogoProps> = ({ company }) => {
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

    return (
        <motion.div
            className="w-full h-full flex items-center justify-center cursor-pointer"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            transition={{ duration: 0.2 }}
            role="img"
            aria-label={`Company logo for ${company.name}`}
        >
            {!imageError ? (
                <>
                    <img
                        src={company.logoUrl}
                        alt={altText}
                        className={`transition-all duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            objectPosition: 'center',
                            filter: 'grayscale(30%) brightness(0.8)',
                            transition: 'all 0.3s ease',
                            maxWidth: '100%',
                            maxHeight: '100%'
                        }}
                        onError={handleImageError}
                        onLoad={handleImageLoad}
                        onMouseEnter={(e) => {
                            if (!shouldReduceMotion) {
                                e.currentTarget.style.filter = 'grayscale(0%) brightness(1)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!shouldReduceMotion) {
                                e.currentTarget.style.filter = 'grayscale(30%) brightness(0.8)';
                            }
                        }}
                        loading="lazy"
                    />
                    {/* Loading indicator */}
                    {!imageLoaded && !imageError && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </>
            ) : (
                /* Fallback for failed images */
                <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xs text-gray-400 font-medium text-center px-1">
                        {company.name}
                    </span>
                </div>
            )}

            {/* Screen reader text */}
            <span className="sr-only">{company.name}</span>
        </motion.div>
    );
};

export default CompanyLogo;