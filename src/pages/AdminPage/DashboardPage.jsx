const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm mb-2">Toplam Öğrenci</h3>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm mb-2">Aktif Eğitimler</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm mb-2">Blog Yazıları</h3>
          <p className="text-3xl font-bold">45</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm mb-2">Toplam Gelir</h3>
          <p className="text-3xl font-bold">₺52,400</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Son Aktiviteler</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="font-medium">Yeni Kayıt: Ahmet Yılmaz</p>
              <p className="text-sm text-gray-500">Web Geliştirme Eğitimi</p>
            </div>
            <span className="text-sm text-gray-500">2 saat önce</span>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="font-medium">Yeni Blog Yazısı</p>
              <p className="text-sm text-gray-500">React.js ile Modern Web Uygulamaları</p>
            </div>
            <span className="text-sm text-gray-500">5 saat önce</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Yeni Yorum</p>
              <p className="text-sm text-gray-500">Python Eğitimi üzerine yorum yapıldı</p>
            </div>
            <span className="text-sm text-gray-500">1 gün önce</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 