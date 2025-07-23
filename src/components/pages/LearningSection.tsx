import React, { useState, useEffect } from 'react';

interface Video {
  id: string;
  title: string;
  url: string;
  description: string;
}

const demoVideos: Video[] = [
  { id: '1', title: 'Why Save Money?', url: 'https://www.youtube.com/embed/1', description: 'Learn the basics of saving.' },
  { id: '2', title: 'Budgeting 101', url: 'https://www.youtube.com/embed/2', description: 'How to make a simple budget.' },
  { id: '3', title: 'Smart Spending', url: 'https://www.youtube.com/embed/3', description: 'Tips for spending wisely.' },
];

export const LearningSection: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Replace with API call if needed
    setVideos(demoVideos);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Financial Learning Videos</h2>
      <div className="grid gap-6">
        {videos.map(video => (
          <div key={video.id} className="bg-white rounded shadow p-4">
            <h3 className="font-semibold mb-2">{video.title}</h3>
            <iframe
              width="100%"
              height="250"
              src={video.url}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mb-2"
            ></iframe>
            <p className="text-gray-600 text-sm">{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
