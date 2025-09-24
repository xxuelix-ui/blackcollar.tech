import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, MessageCircle, Zap, BarChart3 } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
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

  const services = [
    {
      icon: Settings,
      title: 'Business Process Automation',
      description: 'Streamline operations, logistics, and service workflows. Reduce manual work, cut costs, and standardize processes across teams.',
    },
    {
      icon: MessageCircle,
      title: 'Conversational AI Chatbots',
      description: 'Engage customers 24/7 on WhatsApp and Telegram with smart assistants that answer FAQs, track orders, and support English & Chinese. Marketplace integrations (Shopee/Lazada) available via API or partner workflow suppliers.',
    },
    {
      icon: Zap,
      title: 'Ready-to-Use AI Workflows',
      description: 'Deploy quickly with proven, off-the-shelf automations from trusted suppliers that focus on marketing, sales, and operations workflows without heavy setup.',
    },
    {
      icon: BarChart3,
      title: 'Data Insights & Analytics',
      description: 'Turn raw data into simple dashboards and reports. Get real-time KPIs and AI-assisted forecasts to make faster, smarter decisions.',
    },
  ];

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'ArrowLeft' && index > 0) {
      const prevPanel = sectionRef.current?.querySelector(`[data-panel="${index - 1}"]`) as HTMLElement;
      prevPanel?.focus();
    } else if (event.key === 'ArrowRight' && index < services.length - 1) {
      const nextPanel = sectionRef.current?.querySelector(`[data-panel="${index + 1}"]`) as HTMLElement;
      nextPanel?.focus();
    }
  };

  const getPanelStyle = (index: number) => {
    const isHovered = hoveredIndex === index || focusedIndex === index;
    const hasHovered = hoveredIndex !== null || focusedIndex !== null;
    
    let width = '25%';
    let opacity = 0.85;
    let filter = 'none';
    let transform = 'translateY(0px) scale(1)';
    let boxShadow = '0 10px 30px rgba(0, 0, 0, 0.10)';
    
    if (hasHovered) {
      if (isHovered) {
        width = '32%';
        opacity = 1;
        filter = 'none';
        transform = 'translateY(-6px) scale(1.02)';
        boxShadow = '0 16px 44px rgba(0, 0, 0, 0.14)';
      } else {
        width = '22.67%';
        opacity = 0.55;
        filter = 'blur(0.3px)';
      }
    }

    return {
      width,
      opacity,
      filter,
      transform,
      boxShadow,
      transition: 'all 250ms ease-out',
    };
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full px-4 sm:px-6 lg:px-8"
      style={{ 
        backgroundColor: '#F7F7F7',
        padding: 'clamp(48px, 8vh, 96px) 0'
      }}
    >
      <div className="w-full">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 tracking-tight">
            Our Services
          </h2>
        </div>

        {/* Desktop/Tablet: Expandable Panels */}
        <div className="hidden md:block">
          <div 
            className="flex gap-4"
            style={{ height: 'min(88vh, 860px)' }}
          >
            {services.map((service, index) => (
              <article
                key={service.title}
                data-panel={index}
                tabIndex={0}
                aria-labelledby={`service-title-${index}`}
                className="bg-white rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                style={{
                  padding: '40px 32px',
                  ...getPanelStyle(index)
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon size={28} className="text-black" strokeWidth={1.5} />
                </div>
                
                {/* Title - Fixed Typography */}
                <h3 
                  id={`service-title-${index}`}
                  className="text-black mb-4 leading-tight"
                  style={{
                    fontSize: '26px',
                    fontWeight: 700,
                    lineHeight: 1.25
                  }}
                >
                  {service.title}
                </h3>
                
                {/* Accent Divider */}
                <div 
                  className="mb-6"
                  style={{
                    width: '48px',
                    height: '1.5px',
                    backgroundColor: '#6B4CFF'
                  }}
                ></div>
                
                {/* Description - Fixed Typography */}
                <p 
                  className="flex-grow"
                  style={{
                    color: '#4A4A4A',
                    fontSize: '16px',
                    lineHeight: 1.6,
                    fontWeight: 400
                  }}
                >
                  {service.description}
                </p>

                {/* Learn More Link */}
                <button 
                  className="mt-6 text-gray-500 hover:text-black transition-colors duration-200"
                  style={{
                    fontSize: '14px',
                    fontWeight: 400
                  }}
                >
                  Learn more →
                </button>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile: Stacked Cards */}
        <div className="md:hidden space-y-6">
          {services.map((service, index) => (
            <article
              key={service.title}
              tabIndex={0}
              aria-labelledby={`service-title-mobile-${index}`}
              className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-1000 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 hover:shadow-xl ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${400 + index * 200}ms`,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.10)'
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 16px 44px rgba(0, 0, 0, 0.14)';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.10)';
              }}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <service.icon size={28} className="text-black" strokeWidth={1.5} />
              </div>
              
              {/* Title - Fixed Typography */}
              <h3 
                id={`service-title-mobile-${index}`}
                className="text-black mb-4 text-center"
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  lineHeight: 1.25
                }}
              >
                {service.title}
              </h3>
              
              {/* Accent Divider */}
              <div 
                className="mb-6 mx-auto"
                style={{
                  width: '48px',
                  height: '1.5px',
                  backgroundColor: '#6B4CFF'
                }}
              ></div>
              
              {/* Description - Fixed Typography */}
              <p 
                className="text-center mb-6"
                style={{
                  color: '#4A4A4A',
                  fontSize: '15px',
                  lineHeight: 1.6,
                  fontWeight: 400
                }}
              >
                {service.description}
              </p>

              {/* Learn More Link */}
              <div className="text-center">
                <button 
                  className="text-gray-500 hover:text-black transition-colors duration-200"
                  style={{
                    fontSize: '14px',
                    fontWeight: 400
                  }}
                >
                  Learn more →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;