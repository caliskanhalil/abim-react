import { useState, useEffect } from 'react';
import { Outlet, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaBook, 
  FaNewspaper, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';

// Bu fonksiyon gerçek bir auth kontrolü yapmalı
const isAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  if (!token) return false;

  try {
    const decoded = JSON.parse(atob(token));
    const now = new Date().getTime();
    // Token 24 saat geçerliliğini kontrol et
    if (now - decoded.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('adminToken');
      return false;
    }
    return true;
  } catch {
    localStorage.removeItem('adminToken');
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [username, setUsername] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        const decoded = JSON.parse(atob(token));
        setUsername(decoded.username);
      }
    } catch (error) {
      console.error('Token çözülemedi:', error);
    }
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: <FaTachometerAlt />, text: 'Dashboard' },
    { path: '/admin/courses', icon: <FaBook />, text: 'Eğitimler' },
    { path: '/admin/blog', icon: <FaNewspaper />, text: 'Blog Yazıları' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white shadow-lg transition-all duration-300 ease-in-out fixed h-full z-30`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`text-xl font-bold text-gray-800 ${!isSidebarOpen && 'hidden'}`}>
            ABİM Admin
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                    location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <header className="bg-white shadow-sm fixed right-0 left-0 z-20">
          <div className={`h-16 px-6 flex justify-between items-center ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Hoş geldin, {username}</span>
              <button 
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Çıkış Yap
              </button>
            </div>
          </div>
        </header>

        <main className="p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 