import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Video, DollarSign, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { CourseForm } from './CourseForm';
import { VideoForm } from './VideoForm';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  duration: number;
  thumbnail: string;
  videos: Video[];
  isActive: boolean;
  createdAt: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
}

interface Stats {
  totalCourses: number;
  activeCourses: number;
  totalUsers: number;
  schoolStudents: number;
  collegeStudents: number;
  employees: number;
  totalVideos: number;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCourseForVideo, setSelectedCourseForVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchCourses();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/courses');
      const data = await response.json();
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSubmit = async (courseData: FormData) => {
    try {
      const url = selectedCourse 
        ? `http://localhost:5000/api/admin/courses/${selectedCourse.id}`
        : 'http://localhost:5000/api/admin/courses';
      
      const method = selectedCourse ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: courseData,
      });

      const data = await response.json();
      if (data.success) {
        fetchCourses();
        fetchStats();
        setShowCourseForm(false);
        setSelectedCourse(null);
      }
    } catch (error) {
      console.error('Failed to save course:', error);
    }
  };

  const handleVideoSubmit = async (videoData: FormData) => {
    if (!selectedCourseForVideo) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/courses/${selectedCourseForVideo}/videos`, {
        method: 'POST',
        body: videoData,
      });

      const data = await response.json();
      if (data.success) {
        fetchCourses();
        fetchStats();
        setShowVideoForm(false);
        setSelectedCourseForVideo(null);
      }
    } catch (error) {
      console.error('Failed to add video:', error);
    }
  };

  const deleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/courses/${courseId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        fetchCourses();
        fetchStats();
      }
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };

  const deleteVideo = async (courseId: string, videoId: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/courses/${courseId}/videos/${videoId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        fetchCourses();
        fetchStats();
      }
    } catch (error) {
      console.error('Failed to delete video:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-700 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-500">
            Manage courses, videos, and content for Young Wealth
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-navy-700" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalCourses}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-teal-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <Video className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Videos</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalVideos}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Courses</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.activeCourses}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setShowCourseForm(true)}
            className="bg-navy-700 hover:bg-navy-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Course
          </button>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Courses Management</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Videos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-gray-500" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{course.title}</div>
                          <div className="text-sm text-gray-500">{course.level}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                        {course.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{course.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course.videos.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        course.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {course.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedCourse(course);
                            setShowCourseForm(true);
                          }}
                          className="text-teal-600 hover:text-teal-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCourseForVideo(course.id);
                            setShowVideoForm(true);
                          }}
                          className="text-navy-700 hover:text-navy-900"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteCourse(course.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Course Form Modal */}
        {showCourseForm && (
          <CourseForm
            course={selectedCourse}
            onSubmit={handleCourseSubmit}
            onClose={() => {
              setShowCourseForm(false);
              setSelectedCourse(null);
            }}
          />
        )}

        {/* Video Form Modal */}
        {showVideoForm && selectedCourseForVideo && (
          <VideoForm
            courseId={selectedCourseForVideo}
            onSubmit={handleVideoSubmit}
            onClose={() => {
              setShowVideoForm(false);
              setSelectedCourseForVideo(null);
            }}
          />
        )}
      </div>
    </div>
  );
};