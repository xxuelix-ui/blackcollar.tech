import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Google Form URL for consultation booking
  const googleFormUrl = "https://forms.gle/obu3yWiEkcvdXahr5";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleGoogleFormClick = () => {
    window.open(googleFormUrl, '_blank');
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Ready to Get Started?
              </h3>
              <p className="text-gray-600 mb-8 text-center">
                Book your free 30-minute consultation to discuss your AI automation needs and get a custom solution proposal.
              </p>
              
              <button
                onClick={handleGoogleFormClick}
                className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group"
              >
                Book Free AI Consultation
                <Send size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Opens in a new tab • Takes 2-3 minutes to complete
                </p>
              </div>
              
              <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">What to expect:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Free 30-minute consultation call</li>
                  <li>• Custom AI automation proposal</li>
                  <li>• ROI analysis for your business</li>
                  <li>• No commitment required</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="bg-gray-50 rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                {t('contact.getInTouch')}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">support@blackcollar.tech</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{t('contact.location')}</h4>
                    <p className="text-gray-600">{t('contact.serving')}</p>
                    <p className="text-gray-600">support@blackcollar.tech</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {t('contact.whyChoose')}
                </h4>
                <ul className="text-gray-600 space-y-2">
                  {(t('contact.reasons', { returnObjects: true }) as string[]).map((reason, index) => (
                    <li key={index}>• {reason}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;