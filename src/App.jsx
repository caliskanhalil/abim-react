import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogDetail from './pages/BlogPage/BlogDetail';
import CoursesPage from './pages/CoursesPage';
import CourseDetail from './pages/CoursesPage/CourseDetail';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import LoginPage from './pages/AdminPage/LoginPage';
import DashboardPage from './pages/AdminPage/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="hakkimizda" element={<AboutPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="egitimler" element={<CoursesPage />} />
          <Route path="egitimler/:id" element={<CourseDetail />} />
          <Route path="iletisim" element={<ContactPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          {/* Diğer admin sayfaları buraya eklenecek */}
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
