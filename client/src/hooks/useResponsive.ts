import { useState, useEffect } from 'react';

interface ResponsiveState {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    screenWidth: number;
    screenHeight: number;
    isTouchDevice: boolean;
}

export const useResponsive = (): ResponsiveState => {
    const [responsiveState, setResponsiveState] = useState<ResponsiveState>({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1024,
        screenHeight: typeof window !== 'undefined' ? window.innerHeight : 768,
        isTouchDevice: false,
    });

    useEffect(() => {
        const updateResponsiveState = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            setResponsiveState({
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024,
                screenWidth: width,
                screenHeight: height,
                isTouchDevice,
            });
        };

        // Initial check
        updateResponsiveState();

        // Add event listener for window resize
        window.addEventListener('resize', updateResponsiveState);

        // Add event listener for orientation change (mobile devices)
        window.addEventListener('orientationchange', () => {
            // Small delay to ensure dimensions are updated after orientation change
            setTimeout(updateResponsiveState, 100);
        });

        // Cleanup
        return () => {
            window.removeEventListener('resize', updateResponsiveState);
            window.removeEventListener('orientationchange', updateResponsiveState);
        };
    }, []);

    return responsiveState;
};