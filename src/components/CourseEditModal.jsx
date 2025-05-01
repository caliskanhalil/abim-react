import { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaTrash, FaUpload } from 'react-icons/fa';
import { uploadImage } from '../firebase/services';

const CourseEditModal = ({ isOpen, onClose, course, onSave }) => {
  const [formData, setFormData] = useState({
    mainTitle: '',
    subtitle: '',
    imageUrl: '',
    content: {
      egitimSuresi: [
        { "Başlangıç": "" },
        { "Bitiş": "" }
      ],
      mufredat: [],
      tarih: ''
    }
  });
  const [newCurriculumItem, setNewCurriculumItem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (course) {
      setFormData(course);
    } else {
      setFormData({
        mainTitle: '',
        subtitle: '',
        imageUrl: '',
        content: {
          egitimSuresi: [
            { "Başlangıç": "" },
            { "Bitiş": "" }
          ],
          mufredat: [],
          tarih: ''
        }
      });
    }
  }, [course]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Sadece JPEG, PNG ve WEBP formatları desteklenir.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const path = `courses/${Date.now()}_${file.name}`;
      const imageUrl = await uploadImage(file, path);
      setFormData({ ...formData, imageUrl });
    } catch (error) {
      console.error('Resim yükleme hatası:', error);
      setError('Resim yüklenirken bir hata oluştu.');
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleAddCurriculumItem = () => {
    if (newCurriculumItem.trim()) {
      setFormData({
        ...formData,
        content: {
          ...formData.content,
          mufredat: [...formData.content.mufredat, newCurriculumItem.trim()]
        }
      });
      setNewCurriculumItem('');
    }
  };

  const handleRemoveCurriculumItem = (index) => {
    setFormData({
      ...formData,
      content: {
        ...formData.content,
        mufredat: formData.content.mufredat.filter((_, i) => i !== index)
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      setError('Lütfen bir resim yükleyin.');
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {course ? 'Kursu Düzenle' : 'Yeni Kurs'}
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
                Kurs Adı
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.mainTitle}
                onChange={(e) => setFormData({ ...formData, mainTitle: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alt Başlık
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resim
            </label>
            <div className="flex items-center space-x-4">
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Kurs resmi"
                  className="h-20 w-20 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <FaUpload className="mr-2" />
                  <span>Resim Seç</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                  />
                </label>
                {isLoading && (
                  <div className="mt-2">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Başlangıç Tarihi
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.content.egitimSuresi[0]["Başlangıç"]}
                onChange={(e) => setFormData({
                  ...formData,
                  content: {
                    ...formData.content,
                    egitimSuresi: [
                      { "Başlangıç": e.target.value },
                      formData.content.egitimSuresi[1]
                    ]
                  }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bitiş Tarihi
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.content.egitimSuresi[1]["Bitiş"]}
                onChange={(e) => setFormData({
                  ...formData,
                  content: {
                    ...formData.content,
                    egitimSuresi: [
                      formData.content.egitimSuresi[0],
                      { "Bitiş": e.target.value }
                    ]
                  }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ders Günü ve Saati
              </label>
              <input
                type="text"
                required
                placeholder="Örn: Cumartesi : 14:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.content.tarih}
                onChange={(e) => setFormData({
                  ...formData,
                  content: {
                    ...formData.content,
                    tarih: e.target.value
                  }
                })}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Müfredat</h3>
            <div className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newCurriculumItem}
                  onChange={(e) => setNewCurriculumItem(e.target.value)}
                  placeholder="Yeni müfredat konusu ekle"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCurriculumItem()}
                />
                <button
                  type="button"
                  onClick={handleAddCurriculumItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {formData.content.mufredat.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100"
                >
                  <span className="text-gray-700">{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCurriculumItem(index)}
                    className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

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
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseEditModal; 