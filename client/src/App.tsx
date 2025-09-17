import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ParticleBackground } from './components/ParticlesBackground';
import { LandingSection } from './components/LandingSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { Project } from './types';
import axios from 'axios';

function App() {
    const [projects, setProjects] = useLocalStorage<Project[]>('portfolio-projects', []);
    const [isAdmin, setIsAdmin] = useLocalStorage<boolean>('portfolio-admin', false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const { currentSection } = useScrollAnimation();

    // Fetch projects from API on component mount
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/projects');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []); // Empty dependency array - only run on mount

    const handleAdminToggle = () => {
        if (isAdmin) {
            setIsAdmin(false);
        } else {
            // For now, just toggle admin mode - proper authentication will be handled in admin routes
            setIsAdmin(true);
        }
    };

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setShowProjectModal(true);
    };

    const handleCloseProjectModal = () => {
        setShowProjectModal(false);
        setSelectedProject(null);
    };

    const handleSectionClick = () => {
        // This is handled by the navigation component
    };

    return (
        <div className="relative">
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
            <main className="relative z-10">
                <LandingSection onSectionClick={handleSectionClick} />
                <AboutSection />
                <ProjectsSection
                    projects={projects}
                    onProjectClick={handleProjectClick}
                />
                <ContactSection />
            </main>

            {/* Project Detail Modal */}
            <ProjectDetailModal
                project={selectedProject}
                isOpen={showProjectModal}
                onClose={handleCloseProjectModal}
            />
        </div>
    );
}

export default App;
