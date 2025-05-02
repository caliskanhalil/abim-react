import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaClock, FaUser, FaArrowRight } from 'react-icons/fa';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const isBlogPage = useLocation().pathname.startsWith('/blog');

  const handleClick = () => navigate(`/blog/${blog.id}`);

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
          {blog.category}
        </div>
      </div>

      <div className="p-6 flex flex-col h-full">
        <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {blog.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{blog.summary}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <FaUser className="mr-2" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-2" />
            <span>{blog.readTime}</span>
          </div>
        </div>

        <div className="mt-auto">
          {isBlogPage ? (
            <button
              onClick={handleClick}
              className="w-full bg-gray-100 text-blue-600 px-4 py-2 rounded-lg 
                hover:bg-blue-50 transition-colors flex items-center justify-center font-medium"
            >
              Devamını Oku
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <Link
              to={`/blog/${blog.id}`}
              className="w-full bg-gray-100 text-blue-600 px-4 py-2 rounded-lg 
                hover:bg-blue-50 transition-colors flex items-center justify-center font-medium cursor-pointer"
            >
              Devamını Oku
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
