import React from 'react';

interface AvatarSectionProps {
    imageSrc?: string;
    altText?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const AvatarSection: React.FC<AvatarSectionProps> = ({
    imageSrc = "/static/images/barCallMe.png",
    altText = "Bar Tal Avatar",
    size = "lg"
}) => {
    // Size configuration
    const sizeClasses = {
        sm: "w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32",
        md: "w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36",
        lg: "w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48",
        xl: "w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56"
    };

    return (
        <div className="text-center space-y-6 sm:space-y-8">
            <div className="flex justify-center">
                <div
                    className="opacity-0 scale-75 animate-[fadeInScale_0.6s_ease-out_forwards]"
                    style={{
                        animation: 'fadeInScale 0.6s ease-out forwards'
                    }}
                >
                    <div className="relative">
                        <img
                            src={imageSrc}
                            alt={altText}
                            className={`${sizeClasses[size]} rounded-full object-cover shadow-lg transition-transform duration-300 hover:scale-105`}
                            style={{
                                background: 'linear-gradient(45deg, #2563eb, #9333ea)'
                            }}
                            loading="lazy"
                        />
                        {/* Optional decorative ring */}
                        <div className="absolute inset-0 rounded-full ring-4 ring-blue-500/20 ring-offset-4 ring-offset-transparent"></div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
        </div>
    );
};

export default AvatarSection;