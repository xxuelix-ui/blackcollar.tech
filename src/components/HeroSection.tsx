import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    // Redirect directly to Google Form for consultation booking
    window.open('https://forms.gle/obu3yWiEkcvdXahr5', '_blank');
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 tracking-tight">
            AI Automation in Singapore
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-700 leading-relaxed mb-8 max-w-4xl mx-auto">
            Unlock smarter workflows, reduce manual tasks, and grow faster with Blackcollar's tailored AI automation solutions for your business.
          </h2>
        </div>

        <div
          className={`transition-all duration-1000 delay-400 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto justify-center">
              {(t('hero.benefits', { returnObjects: true }) as string[]).map((benefit, index) => (
                <div key={index} className="bg-green-50/50 px-3 py-2 rounded-lg border border-green-100">
                  <p className="text-sm font-normal text-green-700 leading-tight">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollToContact}
            className="inline-flex items-center px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            {t('hero.cta')}
            <ArrowRight
              size={20}
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;