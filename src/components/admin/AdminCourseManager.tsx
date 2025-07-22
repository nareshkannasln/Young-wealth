import React, { useState, useEffect } from 'react';

interface Video {
  id: number;
  title: string;
  url: string;
}

interface Pricing {
  school: number;
  college: number;
}

interface Course {
  id: number;
  title: string;
  description: string;
  videos: Video[];
  content: string;
  pricing: Pricing;
}

const API_URL = 'http://localhost:5000/api/admin/courses';

export const AdminCourseManager = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState<{ title: string; description: string; content: string; schoolPrice: string; collegePrice: string; videos: Video[] }>({ title: '', description: '', content: '', schoolPrice: '', collegePrice: '', videos: [] });
  const [video, setVideo] = useState<{ title: string; url: string }>({ title: '', url: '' });
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  // Protect route: Only allow admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'admin') {
      window.location.href = '/login';
    }
  }, []);

  // Fetch courses
  const fetchCourses = async () => {
    const res = await fetch('http://localhost:5000/api/courses');
    setCourses(await res.json());
  };

  useEffect(() => { fetchCourses(); }, []);

  // Add new course
  const handleAddCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        content: form.content,
        videos: [],
        pricing: {
          school: parseFloat(form.schoolPrice),
          college: parseFloat(form.collegePrice)
        }
      })
    });
    if (res.ok) {
      setForm({ title: '', description: '', content: '', schoolPrice: '', collegePrice: '', videos: [] });
      fetchCourses();
    }
  };

  // Add video to course
  const handleAddVideo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCourse) return;
    const res = await fetch(`${API_URL}/${selectedCourse}/videos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(video)
    });
    if (res.ok) {
      setVideo({ title: '', url: '' });
      fetchCourses();
    }
  };

  // Update content/pricing
  const handleUpdateCourse = async (id: number, content: string | null, schoolPrice: string | null, collegePrice: string | null) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        pricing: {
          school: schoolPrice ? parseFloat(schoolPrice) : undefined,
          college: collegePrice ? parseFloat(collegePrice) : undefined
        }
      })
    });
    fetchCourses();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin: Manage Courses</h2>
      <form onSubmit={handleAddCourse} className="mb-6 bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Add New Course</h3>
        <input className="border p-2 mr-2 mb-2" placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
        <input className="border p-2 mr-2 mb-2" placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
        <input className="border p-2 mr-2 mb-2" placeholder="Content" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required />
        <input className="border p-2 mr-2 mb-2" placeholder="School Price" type="number" value={form.schoolPrice} onChange={e => setForm(f => ({ ...f, schoolPrice: e.target.value }))} required />
        <input className="border p-2 mr-2 mb-2" placeholder="College Price" type="number" value={form.collegePrice} onChange={e => setForm(f => ({ ...f, collegePrice: e.target.value }))} required />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Add Course</button>
      </form>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Courses</h3>
        <ul>
          {courses.map(course => (
            <li key={course.id} className="mb-2 border-b pb-2">
              <div className="flex justify-between items-center">
                <span className="font-bold">{course.title}</span>
                <button className="text-blue-600 underline" onClick={() => setSelectedCourse(course.id)}>Add Video</button>
              </div>
              <div className="text-sm text-gray-600">{course.description}</div>
              <div className="text-sm">Content: {course.content}</div>
              <div className="text-sm">
                School Price: ${course.pricing?.school ?? 'N/A'} | College Price: ${course.pricing?.college ?? 'N/A'}
              </div>
              <button className="text-green-600 underline text-xs mt-1" onClick={() => handleUpdateCourse(course.id, prompt('New content:', course.content), prompt('New school price:', course.pricing?.school?.toString() ?? ''), prompt('New college price:', course.pricing?.college?.toString() ?? ''))}>Edit Content/Pricing</button>
              <div className="mt-2">
                <span className="font-semibold">Videos:</span>
                <ul className="ml-4">
                  {course.videos.map((v: Video) => <li key={v.id}>{v.title} - <a href={v.url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Video Link</a></li>)}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedCourse && (
        <form onSubmit={handleAddVideo} className="bg-white p-4 rounded shadow mb-6">
          <h3 className="font-semibold mb-2">Add Video to Course #{selectedCourse}</h3>
          <input className="border p-2 mr-2 mb-2" placeholder="Video Title" value={video.title} onChange={e => setVideo(v => ({ ...v, title: e.target.value }))} required />
          <input className="border p-2 mr-2 mb-2" placeholder="Video URL" value={video.url} onChange={e => setVideo(v => ({ ...v, url: e.target.value }))} required />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Add Video</button>
          <button className="ml-2 text-red-600 underline" type="button" onClick={() => setSelectedCourse(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};
