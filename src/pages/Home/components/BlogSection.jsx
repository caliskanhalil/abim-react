import BlogCard from '../../../components/BlogCard';
import { blogData } from '../../../data/mockBlog';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Blog</h2>
          <p className="text-gray-600">Blog içeriklerimize buradan ulaşabilirsiniz.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.slice(0, 3).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tüm Yazıları Gör
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
