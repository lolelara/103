import React, { useState } from 'react';

const mockFiles = [
  { id: 1, name: 'خطة غذائية رمضان', fileUrl: 'https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9I/view' },
  { id: 2, name: 'جدول وجبات أسبوعي', fileUrl: 'https://drive.google.com/file/d/2B3C4D5E6F7G8H9I0J/view' },
];

const NutritionFileManagement = () => {
  const [files, setFiles] = useState(mockFiles);
  const [name, setName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [success, setSuccess] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !fileUrl) return;
    setFiles([
      ...files,
      { id: Date.now(), name, fileUrl },
    ]);
    setName('');
    setFileUrl('');
    setSuccess('تمت إضافة الملف بنجاح!');
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-green-200 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-green-900 flex items-center gap-2">
        <span className="animate-bounce">📄</span> إدارة ملفات التغذية
      </h2>
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="اسم الملف"
          value={name}
          onChange={e => setName(e.target.value)}
          className="flex-1 border border-green-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400 transition"
        />
        <input
          type="url"
          placeholder="رابط Google Drive"
          value={fileUrl}
          onChange={e => setFileUrl(e.target.value)}
          className="flex-1 border border-green-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-400 transition"
        />
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition-all scale-100 hover:scale-105">
          إضافة
        </button>
      </form>
      {success && <div className="text-green-600 mb-4 animate-fade-in">{success}</div>}
      <div className="grid md:grid-cols-2 gap-6">
        {files.map(file => (
          <div key={file.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all animate-fade-in-up">
            <h3 className="font-semibold text-lg mb-2 text-green-800 flex items-center gap-1">
              <span className="text-green-400">📎</span> {file.name}
            </h3>
            <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="block bg-green-100 hover:bg-green-200 text-green-700 rounded px-4 py-2 text-center font-bold transition-all mb-2 animate-pulse">
              تحميل / عرض الملف
            </a>
            <div className="text-xs text-gray-400 break-all">{file.fileUrl}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionFileManagement;
