import React, { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ParticleBackground } from './components/ParticlesBackground';
import { LandingSection } from './components/LandingSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { Project } from './types';
import axios from 'axios';

function App() {
    const [projects, setProjects] = useLocalStorage<Project[]>('portfolio-projects', []);
    const [isAdmin, setIsAdmin] = useLocalStorage<boolean>('portfolio-admin', false);
    const { currentSection } = useScrollAnimation();

    // Fetch projects from API on component mount
    useEffect(() => {
        let isMounted = true;

        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/projects');
                if (isMounted) {
                    setProjects(response.data);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        // Clear any cached projects and fetch fresh data
        localStorage.removeItem('portfolio-projects');
        fetchProjects();

        return () => {
            isMounted = false;
        };
    }, []); // Empty dependency array - only run once on mount

    const handleAdminToggle = () => {
        if (isAdmin) {
            setIsAdmin(false);
        } else {
            setIsAdmin(true);
        }
    };

    const handleSectionClick = () => {
        // This is handled by the navigation component
    };

    return (
        <div className="relative w-full max-w-full overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0">
                <ParticleBackground />
            </div>

            {/* Navigation */}
            <Navigation
                isAdmin={isAdmin}
                onAdminToggle={handleAdminToggle}
                onSectionClick={handleSectionClick}
                currentSection={currentSection}
            />

            {/* Main Content */}
            <main className="relative z-10 w-full max-w-full overflow-x-hidden">
                <LandingSection onSectionClick={handleSectionClick} />
                <AboutSection />
                <ProjectsSection projects={projects} />
                <ContactSection />
            </main>
        </div>
    );
}

export default App;
