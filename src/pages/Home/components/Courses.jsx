import { Link } from 'react-router-dom';
import { FaDesktop, FaPython, FaMobile } from 'react-icons/fa';

const courses = [
  {
    id: 1,
    title: 'Web Geliştirme',
    description: 'HTML, CSS, JavaScript öğrenin!',
    icon: <FaDesktop className="text-4xl text-blue-500" />
  },
  {
    id: 2,
    title: 'Python Programlama',
    description: 'Python ile yazılım dünyasına adım atın!',
    icon: <FaPython className="text-4xl text-green-500" />
  },
  {
    id: 3,
    title: 'Mobil Uygulama',
    description: 'Android ve iOS uygulamaları geliştirin.',
    icon: <FaMobile className="text-4xl text-purple-500" />
  }
];

const Courses = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Eğitimlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {course.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-6">{course.description}</p>
              <Link
                to="/egitimler"
                className="inline-block bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
              >
                Eğitime Katıl
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses; 