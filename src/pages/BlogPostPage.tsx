import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Calendar, User, ArrowLeft, Clock, Tag } from 'lucide-react';
import MarketHeader from '../components/MarketHeader';
import SEOHead from '../components/SEOHead';
import Footer from '../components/Footer';
import { blogPosts, getLocalizedPost } from '../data/blog-posts';

const ScrollToTop: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

const BlogPostPage: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    // Set default language to English
    if (!['en', 'zh'].includes(i18n.language)) {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  const currentMarket = 'my'; // Default market for SEO purposes
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const localizedPost = getLocalizedPost(post, i18n.language);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white">
        <SEOHead 
          market={currentMarket}
          title={`${localizedPost.title} | blackcollar Blog`}
          description={localizedPost.excerpt}
          keywords={post.tags.join(', ')}
          canonical={`https://blackcollar.tech/blog/${post.slug}`}
        />
        <MarketHeader market={currentMarket} />
        
        <main className="pt-20 lg:pt-24">
          <ScrollToTop />
          {/* Article Header */}
          <article className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Back to Blog */}
              <Link
                to="/blog"
                className="inline-flex items-center text-gray-600 hover:text-black transition-colors duration-200 mb-8"
              >
                <ArrowLeft size={20} className="mr-2" />
                {t('blogs.backToBlog')}
              </Link>

              {/* Article Meta */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center mr-6">
                    <Calendar size={16} className="mr-2" />
                    {post.date}
                  </div>
                  <div className="flex items-center mr-6">
                    <Clock size={16} className="mr-2" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    {post.author}
                  </div>
                </div>
                
                <h1 className="text-4xl sm:text-5xl font-bold text-black mb-6 leading-tight">
                  {localizedPost.title}
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  {localizedPost.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      <Tag size={14} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured Image Placeholder */}
              {post.featuredImage ? (
                <div className="aspect-video overflow-hidden rounded-lg mb-12">
                  <img 
                    src={post.featuredImage} 
                    alt={localizedPost.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-12 flex items-center justify-center">
                  <span className="text-gray-500 font-medium">Featured Image</span>
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: localizedPost.content }} />
              </div>

              {/* Article Footer */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-black mb-4">
                    {t('blogPost.readyToTransform')}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {t('blogPost.transformDescription')}
                  </p>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      // Navigate to home page with contact section
                      window.location.href = '/#contact';
                    }}
                    className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  >
                    {t('blogPost.bookConsultation')}
                  </a>
                </div>
              </div>
            </div>
          </article>
        </main>
        
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default BlogPostPage;