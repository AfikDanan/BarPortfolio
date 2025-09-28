import React, { useState } from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { ContactForm } from '../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });

    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev: ContactForm) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-16 sm:py-20 lg:py-24 bg-gray-100 bg-opacity-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {/* Section Header */}
          <div className="text-center space-y-8 sm:space-y-12">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Get in Touch</h3>
              </div>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto">
                <div className="flex flex-col items-center space-y-3 sm:space-y-4 text-center p-4 sm:p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="font-semibold text-gray-900 text-base sm:text-lg">Email</div>
                    <div className="text-gray-600 text-sm sm:text-base">
                      <a
                        href="mailto:bar67896@gmail.com"
                        className="hover:text-blue-600 transition-colors break-all sm:break-normal"
                      >
                        bar67896@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-3 sm:space-y-4 text-center p-4 sm:p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-emerald-600" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="font-semibold text-gray-900 text-base sm:text-lg">Phone</div>
                    <div className="text-gray-600 text-sm sm:text-base">
                      <a
                        href="tel:+972546367054"
                        className="hover:text-emerald-600 transition-colors"
                      >
                        054-636-7054
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-3 sm:space-y-4 text-center p-4 sm:p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Linkedin className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="font-semibold text-gray-900 text-base sm:text-lg">
                      <a
                        href="https://www.linkedin.com/in/bar-tal/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-purple-600 transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                    <div className="text-gray-600 text-sm sm:text-base">
                      Connect with me
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  {isSubmitted && (
                    <p className="text-green-600 text-center">Message sent successfully!</p>
                  )}
                </form>
              </div>

              {/* Availability */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 max-w-md mx-auto">
                <h4 className="font-semibold text-gray-900 mb-2">Current Availability</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Open to new opportunities and exciting challenges
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-emerald-700">Available for full-time positions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};