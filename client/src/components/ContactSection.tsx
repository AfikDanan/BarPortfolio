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
    <section id="contact" className="min-h-screen flex items-center justify-center py-20 bg-white bg-opacity-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Section Header */}

          <div className="text-center space-y-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                  I'm always excited to work on challenging projects that require thoughtful
                  UX/UI design. Whether you need a complete system redesign or consultation
                  on specific user experience challenges, I'd love to hear from you.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="flex flex-row justify-between items-center max-w-3xl mx-auto">
                <div className="flex flex-col items-center space-y-2 text-center w-32">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="h-12 flex flex-col justify-center">
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600 text-sm">
                      <a href="mailto:bar67896@gmail.com" className="hover:text-blue-600 transition-colors">bar67896@gmail.com</a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-2 text-center w-32">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="h-12 flex flex-col justify-center">
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-gray-600 text-sm">054-636-7054</div>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-2 text-center w-32">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="h-12 flex flex-col justify-center">
                    <div className="font-semibold text-gray-900">
                      <a href="https://www.linkedin.com/in/bar-tal/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">LinkedIn</a>
                    </div>
                  </div>
                </div>
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