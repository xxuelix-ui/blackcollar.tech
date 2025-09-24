import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If element not found, navigate to home page first
      window.location.href = `/#${sectionId}`;
    }
  };

  const footerLinks = [
    { label: t('nav.home'), id: 'hero' },
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.services'), id: 'services' },
    { label: t('nav.partners'), id: 'partners' },
    { label: t('nav.blogs'), id: 'blogs' },
    { label: t('nav.contact'), id: 'contact' },
  ];

  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">blackcollar</h3>
            <p className="text-gray-300 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <nav className="flex flex-wrap justify-center md:justify-end gap-4">
              {footerLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.label}
                  {index < footerLinks.length - 1 && (
                    <span className="ml-4 text-gray-600">|</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;