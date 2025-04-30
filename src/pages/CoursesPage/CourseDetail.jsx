import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaCalendar, FaClock, FaList, FaArrowLeft, FaUsers, FaChalkboardTeacher, FaGift } from 'react-icons/fa';
import { coursesData } from '../../data/mockCourses';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Kurs Bulunamadı</h2>
          <button
            onClick={() => navigate('/egitimler')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
          >
            Kurslara Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{course.mainTitle} - ABİM</title>
        <meta name="description" content={`${course.mainTitle} - ${course.subtitle}`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-[400px] bg-gray-900">
          <img
            src={course.imageUrl}
            alt={course.mainTitle}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0">
            <div className="container mx-auto px-4 h-full flex flex-col justify-center">
              <div className="max-w-3xl">
                <button
                  onClick={() => navigate('/egitimler')}
                  className="flex items-center text-gray-300 hover:text-white mb-6 transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Kurslara Dön
                </button>
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-white">{course.mainTitle}</h1>
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center text-lg font-medium">
                    <FaGift className="mr-2" />
                    Ücretsiz Eğitim
                  </span>
                </div>
                <p className="text-xl text-gray-300 mb-6">{course.subtitle}</p>
                <div className="flex flex-wrap gap-4 text-gray-300">
                  <div className="flex items-center bg-black/30 px-4 py-2 rounded-lg">
                    <FaChalkboardTeacher className="mr-2" />
                    <span>Uzman Eğitmenler</span>
                  </div>
                  <div className="flex items-center bg-black/30 px-4 py-2 rounded-lg">
                    <FaUsers className="mr-2" />
                    <span>Sınırlı Kontenjan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Eğitim Süresi */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <FaCalendar className="text-blue-500 text-xl" />
                </div>
                <h3 className="text-lg font-semibold">Eğitim Süresi</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Başlangıç</div>
                  <div className="font-medium">{course.content.egitimSuresi[0]["Başlangıç"]}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Bitiş</div>
                  <div className="font-medium">{course.content.egitimSuresi[1]["Bitiş"]}</div>
                </div>
              </div>
            </div>

            {/* Ders Programı */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <FaClock className="text-blue-500 text-xl" />
                </div>
                <h3 className="text-lg font-semibold">Ders Programı</h3>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-500 mb-1">
                  {course.content.tarih.split(':')[0]}
                </div>
                <div className="text-gray-500">
                  Saat: {course.content.tarih.split(':')[1]}
                </div>
              </div>
            </div>

            {/* Müfredat */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <FaList className="text-blue-500 text-xl" />
                </div>
                <h3 className="text-lg font-semibold">Müfredat</h3>
              </div>
              <div className="space-y-2">
                {course.content.mufredat.map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Başvuru Bölümü */}
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center bg-green-100 text-green-600 px-4 py-2 rounded-full mb-6">
                <FaGift className="mr-2" />
                <span className="font-medium">%100 Ücretsiz Eğitim Fırsatı</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">Eğitime Katılmak İster Misiniz?</h2>
              <p className="text-gray-600 mb-6">
                Sınırlı kontenjanımız dahilinde yerinizi hemen ayırtın ve 
                geleceğinize ücretsiz yatırım yapın.
              </p>
              <button
                onClick={() => navigate('/iletisim')}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-medium
                         hover:bg-blue-600 transition-all"
              >
                Hemen Başvur
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail; 