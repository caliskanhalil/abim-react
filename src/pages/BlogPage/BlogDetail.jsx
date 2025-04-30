import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaArrowLeft, FaClock, FaUser, FaCalendar, FaTag } from 'react-icons/fa';
import { blogData } from '../../data/mockBlog';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogData.find(b => b.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Blog Yazısı Bulunamadı</h2>
          <button
            onClick={() => navigate('/blog')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
          >
            Blog'a Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} - ABİM Blog</title>
        <meta name="description" content={blog.summary} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-[400px]">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/50 to-transparent">
            <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
              <button
                onClick={() => navigate('/blog')}
                className="flex items-center text-white/80 hover:text-white mb-6 w-fit transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Blog'a Dön
              </button>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{blog.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center">
                  <FaUser className="mr-2" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendar className="mr-2" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  <span>{blog.readTime}</span>
                </div>
                <div className="flex items-center">
                  <FaTag className="mr-2" />
                  <span>{blog.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 mb-8 font-medium">
                  {blog.summary}
                </p>
                <div className="whitespace-pre-line text-gray-700">
                  {blog.content}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-semibold mb-4">Bu Yazıyı Paylaş</h3>
                <div className="flex gap-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Twitter'da Paylaş
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Facebook'ta Paylaş
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    WhatsApp'ta Paylaş
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail; 