import { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { ParticleBackground } from './components/ParticlesBackground';
import { LandingSection } from './components/LandingSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ProjectDetailView } from './components/ProjectDetailView';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { Project } from './types';
import axios from 'axios';

function App() {
    const [projects, setProjects] = useLocalStorage<Project[]>('portfolio-projects', []);
    const [isAdmin, setIsAdmin] = useLocalStorage<boolean>('portfolio-admin', false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [scrollPosition, setScrollPosition] = useState<number>(0);
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

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseImage = () => {
        setSelectedImage(null);
    };

    const handleProjectClick = (project: Project) => {
        // Save current scroll position
        setScrollPosition(window.scrollY);
        setSelectedProject(project);
        // Scroll to top for the detail view
        window.scrollTo(0, 0);
    };

    const handleBackToProjects = () => {
        setSelectedProject(null);
        // Restore scroll position after a brief delay to allow DOM to update
        setTimeout(() => {
            window.scrollTo(0, scrollPosition);
        }, 50);
    };

    return (
        <div className="relative w-full max-w-full overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0">
                <ParticleBackground />
            </div>

            {/* Navigation - only show when not in project detail view */}
            {!selectedProject && (
                <Navigation
                    isAdmin={isAdmin}
                    onAdminToggle={handleAdminToggle}
                    onSectionClick={handleSectionClick}
                    currentSection={currentSection}
                />
            )}

            {/* Main Content */}
            <main className="relative z-10 w-full max-w-full overflow-x-hidden">
                {selectedProject ? (
                    <ProjectDetailView
                        project={selectedProject}
                        projects={projects}
                        onBack={handleBackToProjects}
                        onImageClick={handleImageClick}
                    />
                ) : (
                    <>
                        <LandingSection onSectionClick={handleSectionClick} />
                        <AboutSection />
                        <ProjectsSection projects={projects} onImageClick={handleImageClick} onProjectClick={handleProjectClick} />
                        <ContactSection />
                    </>
                )}
            </main>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-95 image-modal flex items-center justify-center"
                    onClick={handleCloseImage}
                >
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                        <img
                            src={selectedImage}
                            alt="Project detail"
                            className="w-full h-full object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            onClick={handleCloseImage}
                            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 bg-black bg-opacity-70 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-opacity-90"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
