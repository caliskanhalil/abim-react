import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ABİM</h3>
            <p className="text-gray-300">
              Eğitim ve gelişim için yanınızdayız.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Ana Sayfa</Link></li>
              <li><Link to="/hakkimizda" className="text-gray-300 hover:text-white">Hakkımızda</Link></li>
              <li><Link to="/egitimler" className="text-gray-300 hover:text-white">Eğitimler</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link to="/iletisim" className="text-gray-300 hover:text-white">İletişim</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">İletişim</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@abim.com</li>
              <li>Telefon: +90 123 456 7890</li>
              <li>Adres: İstanbul, Türkiye</li>
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