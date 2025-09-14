import React from 'react';
import { Award, Users, Lightbulb, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutSection: React.FC = () => {
  const stats = [
    { icon: Award, number: '50+', label: 'Projects Completed' },
    { icon: Users, number: '30+', label: 'Happy Clients' },
    { icon: Coffee, number: '∞', label: 'Cups of Coffee' },
    { icon: Lightbulb, number: '100%', label: 'Passion' }
  ];
  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-gray-100 bg-opacity-90 relative bg-opacity-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">About Me</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-left">
              Hi, I'm Bar Tal – a UX/UI designer with 3 years of industry experience
              transforming complex challenges into intuitive digital experiences.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center ">
            {/* Profile Text */}
            <div className="space-y-6">
              <div className="prose prose-lg">
                <p className="text-gray-700 leading-relaxed text-lg">
                  I specialize in crafting user-centered designs for mission-critical systems—where complexity meets                           clarity. My work spans cybersecurity platforms, engineering tools, and enterprise portals, with a focus on                   creating intuitive experiences in environments where every interaction counts.
                </p> <br />
                <p className="text-gray-700 leading-relaxed text-lg">
                  In my role as a lead designer, I’ve driven end-to-end design initiatives that not only improved                              usability, but also delivered measurable business impact—including contract renewals and boosts in user                      adoption. I’m a proactive, collaborative designer who thrives on solving tough UX challenges and                             translating them into clean, effective interfaces.matters.
                </p>
              </div>

            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-gray-900 transition-colors duration-300"
                >
                  <stat.icon className="w-8 h-8 text-coral mx-auto mb-4" />
                  <div className="text-3xl font-light text-charcoal mb-2">{stat.number}</div>
                  <div className="text-sm text-white">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};