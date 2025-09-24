import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import MarketHeader from '../components/MarketHeader';
import SEOHead from '../components/SEOHead';
import Footer from '../components/Footer';
import { blogPosts, getLocalizedPost } from '../data/blog-posts';

const BlogPage: React.FC = () => {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    // Set default language to English
    if (!['en', 'zh'].includes(i18n.language)) {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  const currentMarket = 'my'; // Default market for SEO purposes

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white">
        <SEOHead 
          market={currentMarket}
          title="AI Automation Blog | SME Insights Malaysia & Singapore | blackcollar"
          description="Latest insights on AI automation, business process optimization, and SME growth strategies. Expert guides for Malaysian and Singapore businesses."
          keywords="AI automation blog, SME automation guides, business process optimization, AI chatbot tutorials, workflow automation tips"
        />
        <MarketHeader market={currentMarket} />
        
        <main className="pt-20 lg:pt-24">
          {/* Blog Header */}
          <section className="py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-black mb-6">
                AI Automation Insights
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Expert guides, case studies, and practical tips for SMEs looking to transform their business with AI automation.
              </p>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => {
                  const localizedPost = getLocalizedPost(post, i18n.language);
                  return (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden group"
                    >
                    {post.featuredImage ? (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={post.featuredImage} 
                          alt={localizedPost.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">Featured Image</span>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar size={16} className="mr-2" />
                        {post.date}
                        <Clock size={16} className="ml-4 mr-2" />
                        {post.readTime}
                      </div>
                      <h3 className="text-xl font-semibold text-black mb-3 group-hover:text-gray-700 transition-colors">
                        {localizedPost.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {localizedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <User size={16} className="mr-2" />
                          {post.author}
                        </div>
                        <span className="text-sm font-medium text-black group-hover:text-gray-700">
                          {t('blogs.readMore')} →
                        </span>
                      </div>
                    </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default BlogPage;