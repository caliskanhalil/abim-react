import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';
import { coursesData } from '../../data/mockCourses';
import CourseEditModal from '../../components/CourseEditModal';

const CourseManagement = () => {
  const [courses, setCourses] = useState(coursesData);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Bu kursu silmek istediğinize emin misiniz?')) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setCourses(courses.filter(course => course.id !== id));
      } catch (error) {
        console.error('Silme işlemi başarısız:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = (courseData) => {
    if (selectedCourse) {
      setCourses(courses.map(course => 
        course.id === selectedCourse.id ? { ...courseData, id: course.id } : course
      ));
    } else {
      setCourses([...courses, { ...courseData, id: Date.now().toString() }]);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kurslar</h1>
        <button
          onClick={() => {
            setSelectedCourse(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" />
          Yeni Kurs
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Kurs
                </th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Süre
                </th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlangıç
                </th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bitiş
                </th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ders Günü
                </th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                  Müfredat
                </th>
                <th className="px-8 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                      <img
                        src={course.imageUrl}
                        alt={course.mainTitle}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {course.mainTitle}
                        </div>
                        <div className="text-sm text-gray-500">
                          {course.subtitle}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-500">
                    {course.subtitle.split(' ')[1]} {course.subtitle.split(' ')[2]}
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-500">
                    {course.content.egitimSuresi[0]["Başlangıç"]}
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-500">
                    {course.content.egitimSuresi[1]["Bitiş"]}
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {course.content.tarih}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm text-gray-900">
                      {course.content.mufredat.slice(0, 3).map((item, index) => (
                        <div key={index} className="mb-1">
                          • {item}
                        </div>
                      ))}
                      {course.content.mufredat.length > 3 && (
                        <div className="text-blue-600 text-xs mt-1">
                          +{course.content.mufredat.length - 3} daha fazla konu
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedCourse(course);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      disabled={isLoading}
                    >
                      <FaEdit className="inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={isLoading}
                    >
                      {isLoading ? <FaSpinner className="inline animate-spin" /> : <FaTrash className="inline" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CourseEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourse}
        onSave={handleSave}
      />
    </div>
  );
};

export default CourseManagement; 