import React, { useState } from 'react';

const mockVideos = [
  { id: 1, title: 'تمارين الصدر', youtubeUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U' },
  { id: 2, title: 'تمارين البطن', youtubeUrl: 'https://www.youtube.com/watch?v=2V-20Qe4M8Y' },
];

const TrainingVideoManagement = () => {
  const [videos, setVideos] = useState(mockVideos);
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [success, setSuccess] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !youtubeUrl) return;
    setVideos([
      ...videos,
      { id: Date.now(), title, youtubeUrl },
    ]);
    setTitle('');
    setYoutubeUrl('');
    setSuccess('تمت إضافة الفيديو بنجاح!');
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
        <span className="animate-bounce">🎬</span> إدارة فيديوهات التمارين
      </h2>
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="عنوان الفيديو"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="flex-1 border border-blue-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          type="url"
          placeholder="رابط YouTube"
          value={youtubeUrl}
          onChange={e => setYoutubeUrl(e.target.value)}
          className="flex-1 border border-blue-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 transition"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition-all scale-100 hover:scale-105">
          إضافة
        </button>
      </form>
      {success && <div className="text-green-600 mb-4 animate-fade-in">{success}</div>}
      <div className="grid md:grid-cols-2 gap-6">
        {videos.map(video => (
          <div key={video.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all animate-fade-in-up">
            <h3 className="font-semibold text-lg mb-2 text-blue-800 flex items-center gap-1">
              <span className="text-blue-400">▶️</span> {video.title}
            </h3>
            <div className="aspect-video rounded overflow-hidden mb-2">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeUrl.split('v=')[1]}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              ></iframe>
            </div>
            <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">مشاهدة على YouTube</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingVideoManagement;
