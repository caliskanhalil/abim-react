import { Outlet, Navigate } from 'react-router-dom';

// Bu fonksiyon gerçek bir auth kontrolü yapmalı
const isAuthenticated = () => {
  // Örnek kontrol, gerçek uygulamada JWT token veya session kontrolü yapılmalı
  return localStorage.getItem('adminToken') !== null;
};

const AdminLayout = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">ABİM Admin</h1>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <a href="/admin/dashboard" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/admin/users" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">
                Kullanıcılar
              </a>
            </li>
            <li>
              <a href="/admin/courses" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">
                Eğitimler
              </a>
            </li>
            <li>
              <a href="/admin/blog" className="block px-4 py-2 text-gray-600 hover:bg-gray-50">
                Blog Yazıları
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4">
            <button 
              onClick={() => {
                localStorage.removeItem('adminToken');
                window.location.href = '/admin/login';
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              Çıkış Yap
            </button>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 