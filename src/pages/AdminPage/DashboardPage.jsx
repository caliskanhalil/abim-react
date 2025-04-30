import { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSpinner, FaGraduationCap, FaBook, FaNewspaper, FaTimes } from 'react-icons/fa';
import { 
  getStudents, 
  addStudent, 
  updateStudent, 
  deleteStudent,
  getDashboardStats,
  getCourses
} from '../../firebase/services';

const StudentEditModal = ({ isOpen, onClose, student, onSave, courses }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseId: '',
    courseName: '',
    registrationDate: '',
    status: 'active',
    paymentStatus: 'pending'
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        courseId: '',
        courseName: '',
        registrationDate: new Date().toISOString().split('T')[0],
        status: 'active',
        paymentStatus: 'pending'
      });
    }
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {student ? 'Öğrenci Düzenle' : 'Yeni Öğrenci'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta
              </label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <input
                type="tel"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kayıt Tarihi
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.registrationDate}
                onChange={(e) => setFormData({ ...formData, registrationDate: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kurs
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.courseId}
                onChange={(e) => {
                  const selectedCourse = courses.find(course => course.id === e.target.value);
                  setFormData({
                    ...formData,
                    courseId: e.target.value,
                    courseName: selectedCourse ? selectedCourse.mainTitle : ''
                  });
                }}
              >
                <option value="">Kurs Seçin</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.mainTitle}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durum
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ödeme Durumu
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.paymentStatus}
                onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
              >
                <option value="pending">Beklemede</option>
                <option value="paid">Ödendi</option>
                <option value="partial">Kısmi Ödeme</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalBlogs: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [studentsData, coursesData, dashboardStats] = await Promise.all([
        getStudents(),
        getCourses(),
        getDashboardStats()
      ]);

      setStudents(studentsData);
      setCourses(coursesData);
      setStats({
        totalStudents: dashboardStats.totalStudents,
        totalCourses: dashboardStats.totalCourses,
        totalBlogs: dashboardStats.totalBlogs
      });
    } catch (error) {
      console.error('Veri yükleme hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu öğrenciyi silmek istediğinize emin misiniz?')) {
      setIsLoading(true);
      try {
        await deleteStudent(id);
        await fetchData(); // Listeyi yenile
      } catch (error) {
        console.error('Silme işlemi başarısız:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async (studentData) => {
    setIsLoading(true);
    try {
      if (selectedStudent) {
        await updateStudent(selectedStudent.id, studentData);
      } else {
        await addStudent(studentData);
      }
      await fetchData(); // Listeyi yenile
      setIsModalOpen(false);
    } catch (error) {
      console.error('Kaydetme işlemi başarısız:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Toplam Öğrenci',
      value: stats.totalStudents,
      icon: <FaGraduationCap className="text-blue-500" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Aktif Kurslar',
      value: stats.totalCourses,
      icon: <FaBook className="text-green-500" />,
      bgColor: 'bg-green-50'
    },
    {
      title: 'Blog Yazıları',
      value: stats.totalBlogs,
      icon: <FaNewspaper className="text-purple-500" />,
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-lg p-6 flex items-center justify-between`}
          >
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Öğrenci Listesi */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Öğrenci Listesi</h2>
            <button
              onClick={() => {
                setSelectedStudent(null);
                setIsModalOpen(true);
              }}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Yeni Öğrenci
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Öğrenci
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İletişim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kayıtlı Kurs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kayıt Tarihi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ödeme
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <FaSpinner className="inline animate-spin mr-2" />
                    Yükleniyor...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    Henüz öğrenci kaydı bulunmuyor.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {student.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.email}</div>
                      <div className="text-sm text-gray-500">{student.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.courseName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.registrationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.paymentStatus === 'paid' 
                          ? 'bg-green-100 text-green-800'
                          : student.paymentStatus === 'partial'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.paymentStatus === 'paid' 
                          ? 'Ödendi' 
                          : student.paymentStatus === 'partial'
                          ? 'Kısmi'
                          : 'Beklemede'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        disabled={isLoading}
                      >
                        <FaEdit className="inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={isLoading}
                      >
                        {isLoading ? <FaSpinner className="inline animate-spin" /> : <FaTrash className="inline" />}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <StudentEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        student={selectedStudent}
        onSave={handleSave}
        courses={courses}
      />
    </div>
  );
};

export default DashboardPage; 