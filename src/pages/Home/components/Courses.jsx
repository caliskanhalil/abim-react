import { Link } from 'react-router-dom';
import { FaDesktop, FaPython, FaMobile, FaArrowRight } from 'react-icons/fa';
import { coursesData } from '../../../data/mockCourses';

const Courses = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Eğitimlerimiz</h2>
          <p className="text-gray-600">Kariyerine yön verecek eğitimler</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coursesData.map((course) => (
            <div 
              key={course.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <img 
                    src={course.imageUrl} 
                    alt={course.mainTitle}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-center mb-3 group-hover:text-blue-600 transition-colors">
                  {course.mainTitle}
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  {course.subtitle}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Başlangıç:</span>
                    <span className="font-medium">{course.content.egitimSuresi[0]["Başlangıç"]}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Bitiş:</span>
                    <span className="font-medium">{course.content.egitimSuresi[1]["Bitiş"]}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Gün:</span>
                    <span className="font-medium">{course.content.tarih}</span>
                  </div>
                </div>

                <Link
                  to={`/egitimler/${course.id}`}
                  className="w-full bg-gray-100 text-blue-600 px-4 py-2 rounded-lg 
                           hover:bg-blue-50 transition-colors flex items-center justify-center font-medium"
                >
                  Detaylı Bilgi
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/egitimler"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tüm Eğitimleri Gör
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Courses; 