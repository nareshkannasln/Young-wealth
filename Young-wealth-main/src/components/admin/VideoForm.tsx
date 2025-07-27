import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface VideoFormProps {
  courseId: string;
  onSubmit: (formData: FormData) => void;
  onClose: () => void;
}

export const VideoForm: React.FC<VideoFormProps> = ({ courseId, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 0
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile) {
      alert('Please select a video file');
      return;
    }

    setIsUploading(true);
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('duration', formData.duration.toString());
    submitData.append('video', videoFile);

    try {
      await onSubmit(submitData);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Add Video to Course
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Video Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter video title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter video description"
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              min="0"
              step="0.1"
              required
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="0"
            />
          </div>

          <div>
            <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-2">
              Video File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="video"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500"
                  >
                    <span>Upload a video file</span>
                    <input
                      id="video"
                      name="video"
                      type="file"
                      accept="video/*"
                      required
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  MP4, MOV, AVI up to 100MB
                </p>
                {videoFile && (
                  <p className="text-sm text-green-600 font-medium">
                    Selected: {videoFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy-700 hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-700 disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Add Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};