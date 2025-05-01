import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';
import BlogEditModal from '../../components/BlogEditModal';
import {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
} from '../../services/blogService';
const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      console.log('BlogManagement: Starting to fetch blogs...');
      const blogsData = await getBlogs();
      console.log('BlogManagement: Blogs fetched successfully:', blogsData.length);
      setBlogs(blogsData);
    } catch (error) {
      console.error('BlogManagement: Error fetching blogs:', error);
      console.error('BlogManagement: Error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      setError('Blog yazıları yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu blog yazısını silmek istediğinize emin misiniz?')) {
      setIsLoading(true);
      try {
        console.log('BlogManagement: Starting to delete blog:', id);
        await deleteBlog(id);
        console.log('BlogManagement: Blog deleted successfully');
        await fetchBlogs();
      } catch (error) {
        console.error('BlogManagement: Error deleting blog:', error);
        console.error('BlogManagement: Error details:', {
          code: error.code,
          message: error.message,
          stack: error.stack
        });
        setError('Blog yazısı silinirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async (blogData) => {
    setIsLoading(true);
    try {
      console.log('BlogManagement: Starting to save blog:', blogData);
      if (selectedBlog) {
        console.log('BlogManagement: Updating existing blog:', selectedBlog.id);
        await updateBlog(selectedBlog.id, blogData);
      } else {
        console.log('BlogManagement: Creating new blog');
        await addBlog(blogData);
      }
      console.log('BlogManagement: Blog saved successfully');
      await fetchBlogs();
      setIsModalOpen(false);
    } catch (error) {
      console.error('BlogManagement: Error saving blog:', error);
      console.error('BlogManagement: Error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      setError('Blog yazısı kaydedilirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && blogs.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={fetchBlogs}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blog Yazıları</h1>
        <button
          onClick={() => {
            setSelectedBlog(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" />
          Yeni Blog Yazısı
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlık
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yazar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Henüz blog yazısı bulunmuyor.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {blog.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {blog.summary}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{blog.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedBlog(blog);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        disabled={isLoading}
                      >
                        <FaEdit className="inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={isLoading}
                      >
                        {isLoading ? <FaSpinner className="inline animate-spin" /> : <FaTrash className="inline" />}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BlogEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        blog={selectedBlog}
        onSave={handleSave}
      />
    </div>
  );
};

export default BlogManagement; 