import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ScrollToTop from "./components/ScrollToTop";
import ScrollUpButton from "./components/ScrollUpButton";
// Pages
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogPage/BlogDetail";
import CoursesPage from "./pages/CoursesPage";
import CourseDetail from "./pages/CoursesPage/CourseDetail";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

// Admin Pages
import LoginPage from "./pages/AdminPage/LoginPage";
import DashboardPage from "./pages/AdminPage/DashboardPage";
import BlogManagement from "./pages/AdminPage/BlogManagement";
import CourseManagement from "./pages/AdminPage/CourseManagement";
import EkibeKatil from "./pages/EkibeKatil";

// Auth kontrolü
const isAuthenticated = () => {
  const token = localStorage.getItem("adminToken");
  if (!token) return false;

  try {
    const decoded = JSON.parse(atob(token));
    const now = new Date().getTime();
    if (now - decoded.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem("adminToken");
      return false;
    }
    return true;
  } catch {
    localStorage.removeItem("adminToken");
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollUpButton />
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
          <Route path="/ekibe-katil" element={<EkibeKatil />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="blog" element={<BlogManagement />} />
          <Route path="courses" element={<CourseManagement />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
