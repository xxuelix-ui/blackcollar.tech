import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, DollarSign, Target, Users, Database } from 'lucide-react';

const AboutSection: React.FC = () => {
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

  const features = [
    {
      icon: TrendingUp,
      title: 'AI Growth, Simplified for SMEs',
      description: 'The AI market is booming, and Singapore SMEs can\'t afford to fall behind. We help you ride this wave with confidence.',
    },
    {
      icon: DollarSign,
      title: 'Affordable, High ROI Solutions',
      description: 'We leverage no-code/low-code tools to cut costs, delivering efficiency and measurable results without enterprise-level pricing.',
    },
    {
      icon: Target,
      title: 'Tailored to SME Pain Points',
      description: 'We design practical automation for industries like retail, F&B, and professional services, solving the real problems you face every day.',
    },
    {
      icon: Users,
      title: 'A Partner, Not Just a Vendor',
      description: 'We guide you step by step: start small with pilots, show quick wins, and scale as you grow.',
    },
    {
      icon: Database,
      title: 'Data & Integration Made Easy',
      description: 'We help clean, prepare, and integrate your data so AI works seamlessly with your existing systems.',
    },
  ];

  return (
    <section
      id="about"
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
            Why SMEs Choose Blackcollar
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Blackcollar is a leading AI automation agency helping SMEs in Malaysia and Singapore transform the way they work.
            <br /><br />
            We create tailored AI solutions that streamline operations, lower costs, and open up new growth opportunities, designed for the unique needs of Southeast Asian businesses.
          </p>
        </div>

        {/* Diamond Layout: 3 top, 2 bottom */}
        <div className="mt-16">
          {/* Top row - 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8 lg:mb-12">
            {features.slice(0, 3).map((feature, index) => (
              <div
                key={feature.title}
                className={`text-center transition-all duration-1000 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Bottom row - 2 items centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {features.slice(3, 5).map((feature, index) => (
              <div
                key={feature.title}
                className={`text-center transition-all duration-1000 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${1000 + index * 200}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300">
                  <feature.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;