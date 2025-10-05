import React from 'react';
import { motion } from 'framer-motion';
import AvatarSection from './AvatarSection';

export const AboutSection: React.FC = () => {
  const funFacts = [
    {
      icon: '🔍',
      title: 'Design Detective',
      description: 'I love solving complex UX puzzles! From cybersecurity platforms to engineering sandboxes, I turn messy workflows into delightful experiences.'
    },
    {
      icon: '⚡',
      title: 'Speed & Precision',
      description: '3+ years mastering the art of delivering pixel-perfect designs under tight deadlines. Think Formula 1, but for Figma!'
    },
    {
      icon: '🤝',
      title: 'People Person',
      description: 'I speak fluent CEO, PM, and Developer. Love turning stakeholder meetings into collaborative design sessions where everyone feels heard.'
    },
    {
      icon: '🎓',
      title: 'Honor Roll Graduate',
      description: 'Graduated with honors from Sapir College in Media Design. Still learning something new every day because design never stops evolving!'
    },
    {
      icon: '🛡️',
      title: 'Cybersecurity Whisperer',
      description: 'Specialized in making complex security systems user-friendly. If I can make cybersecurity intuitive, I can design anything!'
    },
    {
      icon: '🌟',
      title: 'Impact Driven',
      description: 'My designs don\'t just look good—they drive results. Client retention, contract renewals, and happy users are my favorite metrics!'
    }
  ];

  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-gray-100 bg-opacity-50 relative py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Section Header with Avatar */}
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Section Header with Avatar */}
            <AvatarSection
              imageSrc="/static/images/bar.png"
              altText="Bar Tal Avatar"
              size="lg"
            />

            <div>
              <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Hey there! I'm Bar Tal
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                Your friendly neighborhood pixel perfectionist 🎯
              </p>
            </div>
          </div>

          {/* Design Philosophy */}
          <motion.div
            className="text-center sm:text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">My Design Philosophy</h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed text-left sm:text-center">
              Great design is like a good joke - if you have to explain it, it's probably not that good.
              I believe in creating interfaces so intuitive that users forget they're using technology.
              Every pixel, every interaction, every color choice serves a purpose.
              Whether I'm redesigning a cybersecurity platform for Check Point or creating an engineering sandbox for
              Israel Electric Corporation, my goal is always the same: make complex things simple, and simple things delightful.
            </p>
          </motion.div>

          {/* Fun Facts Cards - 3 per row, 2 rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {funFacts.map((fact, index) => (
              <motion.div
                key={fact.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200/50 
                         hover:bg-white/90 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 
                         cursor-pointer group"
              >
                <div className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {fact.icon}
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-left sm:text-left">
                  {fact.title}
                </h4>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-left sm:text-left">
                  {fact.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center pt-8 sm:pt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 
                       text-white px-8 py-4 rounded-full font-semibold text-lg
                       hover:from-blue-700 hover:to-purple-700 hover:-translate-y-1 hover:shadow-lg
                       transition-all duration-300"
            >
              <span>Let's Create Something Amazing</span>
              <span>🚀</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};