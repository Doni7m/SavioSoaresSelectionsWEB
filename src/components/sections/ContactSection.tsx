import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { ContactFormData } from '../../types';
import { InteractiveHoverButton } from "../ui/Interactive-Hover-Button";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        success: false,
        message: 'Please fill out all required fields.',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (response.ok) {
        setFormStatus({
          success: true,
          message: 'Your message has been sent. We will contact you shortly.',
        });
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
        });
      } else {
        setFormStatus({
          success: false,
          message: result.error || 'Failed to send your message. Please try again later.',
        });
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message: 'An unexpected error occurred. Please try again later.',
      });
      console.error('Error submitting contact form:', error);
    }

    setTimeout(() => setFormStatus(null), 5000);
  };

  return (
    <section id="contact" className="section bg-white dark:bg-neutral-900">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="section-title mx-auto after:left-1/2 after:-translate-x-1/2 dark:text-white">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get in touch with our team for inquiries about our wine selection or other questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="font-serif text-2xl mb-6 dark:text-white">Send Us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Name <span className="text-wine dark:text-gold">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:focus:border-gold"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Email <span className="text-wine dark:text-gold">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:focus:border-gold"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="input-field dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:focus:border-gold"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Message <span className="text-wine dark:text-gold">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="input-field resize-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:focus:border-gold"
                  required
                />
              </div>

              {formStatus && (
                <div
                  className={`p-4 ${
                    formStatus.success
                      ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <Button type="submit" variant="default">
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <h3 className="font-serif text-2xl mb-6 dark:text-white">Contact Information</h3>
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-wine dark:text-gold mr-4 mt-1" />
                <div>
                  <h4 className="font-medium mb-1 dark:text-white">Address</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    1140 Broadway, STE 207<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-wine dark:text-gold mr-4 mt-1" />
                <div>
                  <h4 className="font-medium mb-1 dark:text-white">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    <a href="tel:+12125557890" className="hover:text-wine dark:hover:text-gold">
                      +1 (212) 555-7890
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-wine dark:text-gold mr-4 mt-1" />
                <div>
                  <h4 className="font-medium mb-1 dark:text-white">Email</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    <a href="mailto:office@savioselections.com" className="hover:text-wine dark:hover:text-gold">
                      office@savioselections.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2 dark:text-white">Business Hours</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: Closed<br />
                Sunday: Closed
              </p>
              <br />
              <br />
              <div>
                  <div className="relative justify-center">
                  <InteractiveHoverButton />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
