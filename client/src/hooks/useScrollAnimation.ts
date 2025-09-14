import { useState, useEffect } from 'react';

export function useScrollAnimation() {
    const [scrollY, setScrollY] = useState(0);
    const [currentSection, setCurrentSection] = useState('landing');
    const [, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const handleScroll = () => {
            if (typeof window === 'undefined') return;

            setScrollY(window.scrollY);

            // Get all sections
            const sections = ['landing', 'about', 'companies', 'projects', 'contact'];
            const windowHeight = window.innerHeight;
            const scrollPosition = window.scrollY + windowHeight / 4 - 150; // Use middle of viewport

            // Find which section is currently in view
            let currentSectionFound = 'landing';

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;
                    const elementBottom = elementTop + rect.height;

                    if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                        currentSectionFound = sectionId;
                        break;
                    }
                }
            }

            setCurrentSection(currentSectionFound);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
            // Call once on mount to set initial section
            handleScroll();

            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return { scrollY, currentSection };
}
