import React from 'react';
import { Project } from '../types';
import { X, ExternalLink, Calendar, User, Target, Settings, Lightbulb } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mobile': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'web': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'complex-systems': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {project.client}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {project.year}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Hero Image */}
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overview Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Project Overview
                </h3>
                <p className="text-gray-700 leading-relaxed">{project.overview}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-blue-600" />
                  Process & Approach
                </h3>
                <p className="text-gray-700 leading-relaxed">{project.process}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
                  Impact & Results
                </h3>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <p className="text-emerald-800 font-medium">{project.impact}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">My Role</h4>
                <p className="text-gray-700 text-sm">{project.role}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Tools Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white text-gray-700 text-sm rounded-md border"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Detail Images */}
          {project.detailImages.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Design Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {project.detailImages.map((image: string, index: number) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden shadow-sm border">
                    <img
                      src={image}
                      alt={`${project.title} detail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Interested in similar work?</h4>
            <p className="text-gray-600 mb-4">Let's discuss how I can help with your complex design challenges.</p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};