import React, { useState, useEffect } from 'react';
import { 
  getAllDocuments, 
  addDocument, 
  updateDocument, 
  deleteDocument,
  subscribeToCollection 
} from '../firebase/services/firestoreService';
import { getAuth } from 'firebase/auth';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Set up real-time listener for blogs
          const unsubscribeBlogs = subscribeToCollection('blogs', (updatedBlogs) => {
            console.log('Received blog updates:', updatedBlogs);
            setBlogs(updatedBlogs);
            setLoading(false);
          });

          return () => {
            unsubscribeBlogs();
          };
        } catch (error) {
          console.error('Error setting up blog listener:', error);
          setError(error.message);
          setLoading(false);
        }
      } else {
        setError('User not authenticated');
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (editingId) {
        await updateDocument('blogs', editingId, formData);
        console.log('Blog updated successfully');
      } else {
        await addDocument('blogs', formData);
        console.log('Blog added successfully');
      }
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        author: '',
        category: ''
      });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving blog:', error);
      setError(error.message);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      category: blog.category
    });
    setEditingId(blog.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteDocument('blogs', id);
        console.log('Blog deleted successfully');
      } catch (error) {
        console.error('Error deleting blog:', error);
        setError(error.message);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{error}</span>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Management</h1>
      
      {/* Blog Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows="4"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
            Author
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingId ? 'Update Blog' : 'Add Blog'}
          </button>
          
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  title: '',
                  content: '',
                  author: '',
                  category: ''
                });
              }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      
      {/* Blog List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <h2 className="font-bold text-xl mb-2">{blog.title}</h2>
              <p className="text-gray-700 text-base mb-4">{blog.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">By {blog.author}</span>
                <span className="text-sm text-gray-600">{blog.category}</span>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-100">
              <button
                onClick={() => handleEdit(blog)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManagement; 