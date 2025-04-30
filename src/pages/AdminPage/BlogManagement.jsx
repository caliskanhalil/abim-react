import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';
import { blogData } from '../../data/mockBlog';
import BlogEditModal from '../../components/BlogEditModal';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState(blogData);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Bu blog yazısını silmek istediğinize emin misiniz?')) {
      setIsLoading(true);
      try {
        // Simüle edilmiş silme işlemi
        await new Promise(resolve => setTimeout(resolve, 500));
        setBlogs(blogs.filter(blog => blog.id !== id));
      } catch (error) {
        console.error('Silme işlemi başarısız:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = (blogData) => {
    if (selectedBlog) {
      // Güncelleme
      setBlogs(blogs.map(blog => 
        blog.id === selectedBlog.id ? { ...blogData, id: blog.id } : blog
      ));
    } else {
      // Yeni ekleme
      setBlogs([...blogs, { ...blogData, id: Date.now().toString() }]);
    }
  };

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
              {blogs.map((blog) => (
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
                    {blog.date}
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
              ))}
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