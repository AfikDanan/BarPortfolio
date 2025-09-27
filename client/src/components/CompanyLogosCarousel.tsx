import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Company } from '../types/Company';
import { CompanyLogo } from './CompanyLogo';
import '../styles/responsive.css';

/**
 * Horizontal scrolling carousel component for displaying company logos
 * Designed to be embedded within other sections
 */
export const CompanyLogosCarousel: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Fetch companies data
    const fetchCompanies = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/api/companies', {
                timeout: 10000,
            });
            setCompanies(response.data || []);
        } catch (error) {
            console.error('Error fetching companies:', error);
            setError('Failed to load company logos');
            setCompanies([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    // Auto-scroll functionality
    useEffect(() => {
        if (!scrollContainerRef.current || companies.length === 0) return;

        const container = scrollContainerRef.current;
        let isScrolling = true;
        let scrollPosition = 0;

        const autoScroll = () => {
            if (!isScrolling || !container) {
                requestAnimationFrame(autoScroll);
                return;
            }

            // Continuous smooth scrolling
            scrollPosition += 0.2; // Adjust speed here

            // Reset position when we've scrolled through one set of companies
            const maxScroll = container.scrollWidth / 5; // Since we have 5 copies
            if (scrollPosition >= maxScroll) {
                scrollPosition = 0;
            }

            container.scrollLeft = scrollPosition;
            requestAnimationFrame(autoScroll);
        };

        // Start the animation
        requestAnimationFrame(autoScroll);

        // Pause auto-scroll on hover
        const handleMouseEnter = () => { isScrolling = false; };
        const handleMouseLeave = () => { isScrolling = true; };

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (container) {
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);

            }
        };
    }, [companies]);

    if (loading) {
        return (
            <div className="w-full overflow-hidden">
                <div className="flex space-x-8 py-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-32 h-20 flex items-center justify-center">
                            <div className="w-4 h-4 border border-blue-300 border-t-transparent rounded-full animate-spin opacity-50"></div>
                        </div>
                    ))}
                </div>
            </div >
        );
    }

    if (error || companies.length === 0) {
        return (
            <div className="w-full text-center py-8">
                <p className="text-gray-500 text-sm">
                    {error || 'No company logos available'}
                </p>
            </div>
        );
    }

    // Always use scrolling carousel for better visual effect

    // Duplicate companies array multiple times for smooth infinite scroll effect
    const duplicatedCompanies = [...companies, ...companies, ...companies, ...companies, ...companies];

    return (
        <div className="w-full relative">
            {/* Scrollable Container */}
            <div
                ref={scrollContainerRef}
                className="flex space-x-16 scrollbar-hide carousel-container py-8 px-10"
                style={{
                    scrollBehavior: 'auto'
                }}
            >
                {duplicatedCompanies.map((company, index) => (
                    <motion.div
                        key={`${company.id}-${index}`}
                        className="flex-shrink-0 w-32 h-30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (index % companies.length) * 0.05, duration: 0.3 }}
                    >
                        <CompanyLogo company={company} index={index} />
                    </motion.div>
                ))}
            </div>

            {/* Gradient overlays for smooth edges */}
        </div>
    );
};

export default CompanyLogosCarousel;