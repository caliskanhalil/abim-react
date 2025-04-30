import { Link } from 'react-router-dom';
import { FaCalendar, FaUser } from 'react-icons/fa';

const blogPosts = [
  {
    id: 1,
    title: "Gençlere Tavsiyeler",
    excerpt: "Gençlerin kişisel ve mesleki gelişimi için önemli tavsiyeler...",
    author: "Admin",
    date: "15 Mart 2024",
    image: "/blog-1.jpg",
    slug: "genclere-tavsiyeler"
  },
  {
    id: 2,
    title: "Eğitimde Yeni Trendler",
    excerpt: "2024 yılında öne çıkan eğitim trendleri ve yenilikler...",
    author: "Admin",
    date: "10 Mart 2024",
    image: "/blog-2.jpg",
    slug: "egitimde-yeni-trendler"
  },
  {
    id: 3,
    title: "Başarı Hikayeleri",
    excerpt: "Mezunlarımızın ilham veren başarı hikayeleri...",
    author: "Admin",
    date: "5 Mart 2024",
    image: "/blog-3.jpg",
    slug: "basari-hikayeleri"
  }
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Blog</h2>
          <p className="text-gray-600">En son haberler ve güncellemeler</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Link to={`/blog/${post.slug}`}>
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="mr-2" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <Link 
                  to={`/blog/${post.slug}`}
                  className="block"
                >
                  <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link 
                  to={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                >
                  Devamını Oku
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/blog"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tüm Yazıları Gör
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 