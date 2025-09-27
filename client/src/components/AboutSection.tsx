import React from 'react';
import { motion } from 'framer-motion';
import { CompanyLogosCarousel } from './CompanyLogosCarousel';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-gray-100 bg-opacity-50 relative py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* Section Header */}
          <div className="text-center space-y-4 sm:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">About Me</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto text-center px-2 sm:px-0">
              Hi, I'm Bar Tal – a UX/UI designer with 3 years of industry experience
              transforming complex challenges into intuitive digital experiences.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Profile Text */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg lg:text-xl">
                  I specialize in crafting user-centered designs for mission-critical systems—where complexity meets
                  clarity. My work spans cybersecurity platforms, engineering tools, and enterprise portals, with a focus on
                  creating intuitive experiences in environments where every interaction counts.
                </p>
                <br className="hidden sm:block" />
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg lg:text-xl">
                  In my role as a lead designer, I've driven end-to-end design initiatives that not only improved
                  usability, but also delivered measurable business impact—including contract renewals and boosts in user
                  adoption. I'm a proactive, collaborative designer who thrives on solving tough UX challenges and
                  translating them into clean, effective interfaces.
                </p>
              </div>
            </div>

            {/* Profile Image*/}
            {/* <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              {/* Hello GIF */}
            {/* <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <img
                    src="/static/gif/bar.png"
                    alt="Hello animation - Bar Tal waving"
                    className="w-40 h-480  "
                    loading="lazy"
                  /> */}
            {/* </div>
              </motion.div> */}

          </div>
          {/* Company Logos Carousel */}

          <div className="relative w-full max-w-6xl mx-auto">
            <CompanyLogosCarousel />
          </div>
        </div>
      </div>
    </section >
  );
};