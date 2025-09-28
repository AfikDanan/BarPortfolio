import React from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
    selectedImage: string | null;
    onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ selectedImage, onClose }) => {
    if (!selectedImage) return null;

    return (
        <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
                <img
                    src={selectedImage}
                    alt="Enlarged view"
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                />
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                >
                    <X className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                    Press ESC or click outside to close
                </div>
            </div>
        </div>
    );
};