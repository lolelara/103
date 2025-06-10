import React, { useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { ARABIC_STRINGS } from '../../../constants';

const TraineeNutritionViewer: React.FC = () => {
  const { user, nutritionFiles, fetchNutritionFiles, actionLoading } = useAuth();

  useEffect(() => {
    if (user) {
        // Fetch files assigned to this trainee, or from their trainer, or general admin files
        fetchNutritionFiles({ forTraineeId: user.id });
    }
  }, [user, fetchNutritionFiles]);

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-green-900 flex items-center gap-2">
        <span className="animate-bounce">🥗</span> {ARABIC_STRINGS.nutritionFiles}
      </h2>

      {actionLoading && <p className="text-blue-300">جاري تحميل ملفات التغذية...</p>}
      {!actionLoading && nutritionFiles.length === 0 && (
        <p className="text-gray-400">{ARABIC_STRINGS.noDataAvailable} لا توجد ملفات تغذية متاحة لك حاليًا.</p>
      )}

      {nutritionFiles.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {nutritionFiles.map(file => (
            <div key={file.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all animate-fade-in-up">
              <h3 className="font-semibold text-lg mb-2 text-green-800 flex items-center gap-1">
                <span className="text-green-400">📎</span> {file.name}
              </h3>
              <a 
                href={file.fileUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block bg-green-100 hover:bg-green-200 text-green-700 rounded px-4 py-2 text-center font-bold transition-all mb-2 animate-pulse"
                title="فتح الملف في تبويب جديد"
              >
                <i className="fas fa-external-link-alt me-1"></i> تحميل / عرض الملف
              </a>
              <div className="text-xs text-gray-400 break-all">{file.fileUrl}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TraineeNutritionViewer;
