import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            {/* Mobil Logo (Sadece ABİM yazısı) */}
            <span className="md:hidden text-2xl font-bold text-gray-800">
              ABİM
            </span>

            {/* Desktop Logo (ABİM | İlim, Ahlak ve Teknoloji) */}
            <div className="hidden md:flex items-center space-x-2 h-16">
              <img
                src="../../logo.png"
                alt="ABİM Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="text-gray-500">|</span>
              <span className="text-lg text-gray-600">
                İlim, Ahlak ve Teknoloji
              </span>
            </div>
          </Link>

          {/* Mobil Menü Butonu */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Menü */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Ana Sayfa
            </Link>
            <Link
              to="/hakkimizda"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Hakkımızda
            </Link>
            <Link
              to="/egitimler"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Eğitimler
            </Link>
            <Link
              to="/blog"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/iletisim"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              İletişim
            </Link>
          </div>
        </div>

        {/* Mobil Menü */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                to="/hakkimizda"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Hakkımızda
              </Link>
              <Link
                to="/egitimler"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Eğitimler
              </Link>
              <Link
                to="/blog"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/iletisim"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                İletişim
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
