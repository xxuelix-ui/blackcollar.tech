import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const PartnersSection: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Placeholder partner data
  const partners = [
    { name: 'Partner 1', placeholder: 'Logo 1' },
    { name: 'Partner 2', placeholder: 'Logo 2' },
    { name: 'Partner 3', placeholder: 'Logo 3' },
    { name: 'Partner 4', placeholder: 'Logo 4' },
    { name: 'Partner 5', placeholder: 'Logo 5' },
    { name: 'Partner 6', placeholder: 'Logo 6' },
  ];

  return (
    <section
      id="partners"
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
            Our AI Ecosystem
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We collaborate with leading AI providers to bring you proven, ready-to-use solutions tailored for SMEs.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className={`bg-gray-100 rounded-lg h-24 flex items-center justify-center border-2 border-gray-200 hover:border-black transition-all duration-300 hover:shadow-lg ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <span className="text-gray-500 font-medium text-sm">
                {partner.placeholder}
              </span>
            </div>
          ))}
        </div>

        <div
          className={`mt-16 text-center transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;