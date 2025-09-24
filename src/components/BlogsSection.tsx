import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRecentPosts, getLocalizedPost } from '../data/blog-posts';

const BlogsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
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

  // Get recent blog posts
  const blogPosts = getRecentPosts(3);

  return (
    <section
      id="blogs"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gray-50 px-4 sm:px-6 lg:px-8"
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
            {t('blogs.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('blogs.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => {
            const localizedPost = getLocalizedPost(post, i18n.language);
            return (
              <Link
                to={`/blog/${post.slug}`}
                key={post.slug}
                className={`block bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                {post.featuredImage && (
                  <div className="mb-4 -mx-6 -mt-6">
                    <img 
                      src={post.featuredImage} 
                      alt={localizedPost.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{localizedPost.title}</h3>
                <p className="text-gray-600 mb-4">{localizedPost.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    {post.readTime}
                  </div>
                </div>
                <div className="inline-flex items-center text-gray-900 font-medium hover:text-gray-700 transition-colors">
                  {t('blogs.readMore')} →
                </div>
              </Link>
            );
          })}
        </div>
        
        <div
          className={`text-center mt-12 transition-all duration-1000 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            {t('blogs.viewAll')}
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;