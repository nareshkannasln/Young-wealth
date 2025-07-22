const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// In-memory demo data
let courses = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn React from scratch.",
    videos: [
      { id: 1, title: "Introduction", url: "https://demo.com/video1.mp4" },
      { id: 2, title: "JSX & Components", url: "https://demo.com/video2.mp4" }
    ],
    content: "Full course content goes here...",
    pricing: {
      school: 29.99,
      college: 49.99
    }
  }
];

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get all courses
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Get a single course by id
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course);
});

// Admin: Add a new course
app.post('/api/admin/courses', (req, res) => {
  const { title, description, videos, content, pricing } = req.body;
  const newCourse = {
    id: courses.length + 1,
    title,
    description,
    videos: videos || [],
    content,
    pricing: pricing || { school: 0, college: 0 }
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// Admin: Add a video to a course
app.post('/api/admin/courses/:id/videos', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ error: 'Course not found' });
  const { title, url } = req.body;
  const newVideo = {
    id: course.videos.length + 1,
    title,
    url
  };
  course.videos.push(newVideo);
  res.status(201).json(newVideo);
});

// Admin: Update course content or pricing
app.put('/api/admin/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ error: 'Course not found' });
  const { content, pricing } = req.body;
  if (content !== undefined) course.content = content;
  if (pricing !== undefined) course.pricing = pricing;
  res.json(course);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
