import React from 'react';
import { ArrowLeft, User, Calendar, Target, Settings, Lightbulb } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailViewProps {
    project: Project;
    onBack: () => void;
    onImageClick: (imageUrl: string) => void;
    projects: Project[];
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
    project,
    onBack,
    onImageClick,
    projects
}) => {
    // Predefined color mapping - object ensures Tailwind includes all classes at build time
    const PROJECT_COLORS = {
        'emerald': 'bg-emerald-600',
        'orange': 'bg-orange-600',
        'green': 'bg-green-600',
        'purple': 'bg-purple-600',
        'red': 'bg-red-600',
        'indigo': 'bg-indigo-600',
        'pink': 'bg-pink-600',
        'yellow': 'bg-yellow-600',
        'blue': 'bg-blue-600'
    } as const;

    const getHeaderColor = (colorKey?: string) => {
        return PROJECT_COLORS[colorKey as keyof typeof PROJECT_COLORS] || PROJECT_COLORS.blue;
    };

    const headerColor = getHeaderColor(project?.headerColor);

    return (
        <div className="w-full" data-project-detail>
            {/* Hero Section */}
            <div className={`${headerColor} text-white py-8 mb-8 rounded-t-2xl relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                <div className="relative px-6">
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={onBack}
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Projects
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="flex items-center space-x-4 text-sm text-white/90 mb-6">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-1" />
                                    {project.client}
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {project.year}
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-medium border bg-white/20 text-white border-white/30">
                                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {project.title}
                            </h1>

                            <p className="text-xl text-white/90 mb-8 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                <h4 className="font-semibold text-white mb-2">My Role</h4>
                                <p className="text-white/95 text-sm">{project.role}</p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full rounded-xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6">
                {/* Overview Section */}
                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <Target className="w-6 h-6 mr-3 text-blue-500" />
                                Project Overview
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-lg">{project.overview}</p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <Settings className="w-6 h-6 mr-3 text-blue-500" />
                                Process & Approach
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-lg">{project.process}</p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <Lightbulb className="w-6 h-6 mr-3 text-blue-500" />
                                Impact & Results
                            </h3>
                            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                                <p className="text-emerald-800 font-medium text-lg leading-relaxed">{project.impact}</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="bg-gray-50 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-4">Tools Used</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tools.map((tool, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-white text-gray-700 text-sm rounded-md border border-gray-200"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 backdrop-blur-sm rounded-lg p-6 border border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-4">Project Details</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Client:</span>
                                        <span className="text-gray-900">{project.client}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Year:</span>
                                        <span className="text-gray-900">{project.year}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Category:</span>
                                        <span className="text-gray-900">{project.category}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Duration:</span>
                                        <span className="text-gray-900">{project.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Design Details */}
                {project.detailImages.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">Design Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {project.detailImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-all duration-300 group"
                                    onClick={() => onImageClick(image)}
                                >
                                    <img
                                        src={image}
                                        alt={`${project.title} detail ${index + 1}`}
                                        className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-600 text-sm mt-4">Click on any image to view larger</p>
                    </div>
                )}

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 text-center mb-8">
                    <h4 className="text-2xl font-semibold text-gray-900 mb-4">Interested in similar work?</h4>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                        Let's discuss how I can help with your complex design challenges and create solutions that drive results.
                    </p>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                        Get In Touch
                    </button>
                </div>

                {/* Navigation */}
                <div className="border-t border-gray-200 pt-8 pb-4">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={onBack}
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to All Projects
                        </button>

                        <div className="text-sm text-gray-500">
                            Project {project.id} of {projects.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};