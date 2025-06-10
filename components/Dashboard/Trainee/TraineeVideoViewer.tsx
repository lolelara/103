import React, { useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { ARABIC_STRINGS } from '../../../constants';

const TraineeVideoViewer: React.FC = () => {
  const { user, trainingVideos, fetchTrainingVideos, actionLoading } = useAuth();

  useEffect(() => {
    if (user) {
      // Fetch videos uploaded by their assigned coach OR general admin videos.
      // إذا كان للمتدرب مدرب (coachId)، اجلب فيديوهات المدرب، وإلا اجلب فيديوهات عامة/إدارية
      if (user.coachId) {
        fetchTrainingVideos(user.coachId); 
      } else {
        fetchTrainingVideos(); // Attempt to fetch general/admin videos
      }
    }
  }, [user, fetchTrainingVideos]);

  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
        <span className="animate-bounce">🎥</span> {ARABIC_STRINGS.trainingVideos}
      </h2>
      
      {actionLoading && <p className="text-blue-300">جاري تحميل الفيديوهات...</p>}
      {!actionLoading && trainingVideos.length === 0 && (
        <p className="text-gray-400">{ARABIC_STRINGS.noDataAvailable} لا توجد فيديوهات تدريبية متاحة لك حاليًا.</p>
      )}

      {trainingVideos.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {trainingVideos.map(video => {
             const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl);
             return (
                <div key={video.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all animate-fade-in-up">
                    <h3 className="font-semibold text-lg mb-2 text-blue-800 flex items-center gap-1">
                      <span className="text-blue-400">▶️</span> {video.title}
                    </h3>
                    <div className="aspect-video rounded overflow-hidden mb-2">
                      <iframe
                        src={embedUrl}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-none"
                      ></iframe>
                    </div>
                    <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">مشاهدة على YouTube</a>
                </div>
             );
          })}
        </div>
      )}
    </div>
  );
};

export default TraineeVideoViewer;
