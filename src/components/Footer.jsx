import { Link } from 'react-router-dom';
import { FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left items-center md:items-start">
          
          {/* ABİM ve Sosyal Medya */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">ABİM</h3>
            <p className="text-gray-300 mb-4">Eğitim ve gelişim için yanınızdayız.</p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/abimagd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-transform transform hover:scale-125 duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://www.youtube.com/@abimagd/featured"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-transform transform hover:scale-125 duration-200"
                aria-label="YouTube"
              >
                <FaYoutube className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Hızlı Bağlantılar */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Ana Sayfa</Link></li>
              <li><Link to="/hakkimizda" className="text-gray-300 hover:text-white">Hakkımızda</Link></li>
              <li><Link to="/egitimler" className="text-gray-300 hover:text-white">Eğitimler</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link to="/iletisim" className="text-gray-300 hover:text-white">İletişim</Link></li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">İletişim</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info.abimagd@gmail.com</li>
              <li>Telefon: +90 (536) 715 41 11</li>
              <li>Adres: Türkocağı, 24014. Sk. No:2 01020 Seyhan/Adana</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} ABİM. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
