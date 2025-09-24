import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MarketHeader from '../components/MarketHeader';
import SEOHead from '../components/SEOHead';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import PartnersSection from '../components/PartnersSection';
import BlogsSection from '../components/BlogsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const MainPage: React.FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  // Determine market based on URL path
  const getMarket = (): 'my' | 'sg' => {
    if (location.pathname.startsWith('/sg')) return 'sg';
    if (location.pathname.startsWith('/my')) return 'my';
    return 'my'; // default
  };

  const market = getMarket();

  useEffect(() => {
    // Set default language to English
    if (!['en', 'zh'].includes(i18n.language)) {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white">
        <SEOHead 
          market={market}
          title="Blackcollar | AI Automation"
          description="Leading AI automation agency helping SMEs in Malaysia & Singapore increase efficiency by 300%. Custom chatbots, workflow automation & business process optimization. Free consultation available."
          keywords="AI automation Malaysia Singapore, SME automation solutions, business process automation, AI chatbot, workflow automation, cross-border digital solutions"
        />
        <MarketHeader market={market} />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <PartnersSection />
          <BlogsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default MainPage;