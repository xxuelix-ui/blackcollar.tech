import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  market?: 'my' | 'sg';
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://blackcollar.tech/blackcollar_logo_transparent.png',
  market
}) => {
  const { i18n } = useTranslation();
  
  const defaultTitles = {
    my: 'Blackcollar | AI Automation',
    sg: 'Blackcollar | AI Automation'
  };

  const defaultDescriptions = {
    my: 'Leading AI automation agency in Malaysia. Help SMEs increase efficiency 300%. Custom chatbots, workflow automation. Free consultation.',
    sg: 'Top business automation solutions in Singapore. AI chatbots, process automation for SMEs. Proven 300% efficiency gains. Book free consultation today.'
  };

  const defaultKeywords = {
    my: 'AI automation Malaysia, SME automation Malaysia, business process automation, AI chatbot Malaysia, workflow automation Malaysia',
    sg: 'business automation Singapore, AI solutions SME Singapore, workflow automation, AI chatbot Singapore, process optimization'
  };

  const pageTitle = title || 'Blackcollar | AI Automation';
  const pageDescription = description || (market ? defaultDescriptions[market] : defaultDescriptions.my);
  const pageKeywords = keywords || (market ? defaultKeywords[market] : defaultKeywords.my);
  const pageCanonical = canonical || `https://blackcollar.tech${market ? `/${market}` : ''}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <link rel="canonical" href={pageCanonical} />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" href="/IMG_1257.png" />
      <link rel="shortcut icon" type="image/png" href="/IMG_1257.png" />
      <link rel="apple-touch-icon" href="/IMG_1257.png" />
      
      {/* Language and region targeting */}
      <meta name="language" content={i18n.language} />
      <meta name="geo.region" content={market === 'sg' ? 'SG' : 'MY'} />
      <meta name="geo.placename" content={market === 'sg' ? 'Singapore' : 'Malaysia'} />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={i18n.language === 'zh' ? 'zh_CN' : 'en_US'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Hreflang for multilingual SEO */}
      {market === 'my' && (
        <>
          <link rel="alternate" hrefLang="en" href="https://blackcollar.tech/my" />
          <link rel="alternate" hrefLang="zh" href="https://blackcollar.tech/my" />
        </>
      )}
      {market === 'sg' && (
        <>
          <link rel="alternate" hrefLang="en" href="https://blackcollar.tech/sg" />
          <link rel="alternate" hrefLang="zh" href="https://blackcollar.tech/sg" />
        </>
      )}
      
      {/* Structured Data for Local Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "blackcollar",
          "description": pageDescription,
          "url": pageCanonical,
          "logo": ogImage,
          "image": ogImage,
          "telephone": "+60-123-456-789",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": market === 'sg' ? 'SG' : 'MY',
            "addressRegion": market === 'sg' ? 'Singapore' : 'Johor',
            "addressLocality": market === 'sg' ? 'Singapore' : 'Johor Bahru'
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": market === 'sg' ? "1.3521" : "1.4927",
            "longitude": market === 'sg' ? "103.8198" : "103.7414"
          },
          "areaServed": {
            "@type": "Country",
            "name": market === 'sg' ? 'Singapore' : 'Malaysia'
          },
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": market === 'sg' ? "1.3521" : "1.4927",
              "longitude": market === 'sg' ? "103.8198" : "103.7414"
            },
            "geoRadius": "50000"
          },
          "priceRange": "$$",
          "openingHours": "Mo-Fr 09:00-18:00",
          "sameAs": [
            "https://www.linkedin.com/company/blackcollar",
            "https://twitter.com/blackcollar"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;