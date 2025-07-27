const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Course = require('../models/Course');
const User = require('../models/User');
const { authenticateAdmin } = require('../middleware/auth');


// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
const videosDir = path.join(uploadsDir, 'videos');
const thumbnailsDir = path.join(uploadsDir, 'thumbnails');

[uploadsDir, videosDir, thumbnailsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'video') {
      cb(null, videosDir);
    } else if (file.fieldname === 'thumbnail') {
      cb(null, thumbnailsDir);
    } else {
      cb(null, uploadsDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'video') {
      if (file.mimetype.startsWith('video/')) {
        cb(null, true);
      } else {
        cb(new Error('Only video files are allowed'));
      }
    } else if (file.fieldname === 'thumbnail') {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed'));
      }
    } else {
      cb(null, true);
    }
  }
});

// Admin login (separate from regular auth)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase().trim(), isActive: true });
    if (!user || user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
    }
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
    }
    const { password: _, ...adminResponse } = user.toObject();
    res.json({ success: true, admin: adminResponse });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, error: 'Admin login failed' });
  }
});

// Get all courses (admin view)
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ success: true, courses });
  } catch (error) {
    console.error('Fetch courses error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch courses' });
  }
});

// Create new course
router.post('/courses', upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, description, category, level, price, duration } = req.body;
    const errors = {};
    if (!title || title.trim().length < 3) errors.title = 'Title must be at least 3 characters long';
    if (!description || description.trim().length < 10) errors.description = 'Description must be at least 10 characters long';
    if (!['school', 'college', 'employee'].includes(category)) errors.category = 'Invalid category';
    if (!['beginner', 'intermediate', 'advanced'].includes(level)) errors.level = 'Invalid level';
    if (isNaN(parseFloat(price)) || parseFloat(price) < 0) errors.price = 'Price must be a valid number';
    if (isNaN(parseInt(duration)) || parseInt(duration) <= 0) errors.duration = 'Duration must be a positive number';
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, error: 'Validation failed', errors });
    }
    const courseData = {
      title: title.trim(),
      description: description.trim(),
      category,
      level,
      price: parseFloat(price) || 0,
      duration: parseInt(duration) || 0,
      thumbnail: req.file ? `/uploads/thumbnails/${req.file.filename}` : null
    };
    const course = await Course.create(courseData);
    res.status(201).json({ success: true, course });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ success: false, error: 'Failed to create course' });
  }
});

// Update course
router.put('/courses/:id', upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, description, category, level, price, duration, isActive } = req.body;
    const errors = {};
    if (title && title.trim().length < 3) errors.title = 'Title must be at least 3 characters long';
    if (description && description.trim().length < 10) errors.description = 'Description must be at least 10 characters long';
    if (category && !['school', 'college', 'employee'].includes(category)) errors.category = 'Invalid category';
    if (level && !['beginner', 'intermediate', 'advanced'].includes(level)) errors.level = 'Invalid level';
    if (price && (isNaN(parseFloat(price)) || parseFloat(price) < 0)) errors.price = 'Price must be a valid number';
    if (duration && (isNaN(parseInt(duration)) || parseInt(duration) <= 0)) errors.duration = 'Duration must be a positive number';
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, error: 'Validation failed', errors });
    }
    const updateData = {};
    if (title) updateData.title = title.trim();
    if (description) updateData.description = description.trim();
    if (category) updateData.category = category;
    if (level) updateData.level = level;
    if (price !== undefined) updateData.price = parseFloat(price) || 0;
    if (duration !== undefined) updateData.duration = parseInt(duration) || 0;
    if (isActive !== undefined) updateData.isActive = isActive === 'true';
    if (req.file) updateData.thumbnail = `/uploads/thumbnails/${req.file.filename}`;
    const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    res.json({ success: true, course });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ success: false, error: 'Failed to update course' });
  }
});

// Delete course
router.delete('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete course' });
  }
});

// Add video to course
router.post('/courses/:courseId/videos', upload.single('video'), async (req, res) => {
  try {
    const { title, description, duration } = req.body;
    const errors = {};
    if (!title || title.trim().length < 3) errors.title = 'Video title must be at least 3 characters long';
    if (!description || description.trim().length < 10) errors.description = 'Video description must be at least 10 characters long';
    if (isNaN(parseInt(duration)) || parseInt(duration) <= 0) errors.duration = 'Duration must be a positive number';
    if (!req.file) errors.video = 'Video file is required';
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, error: 'Validation failed', errors });
    }
    const videoData = {
      title: title.trim(),
      description: description.trim(),
      videoUrl: `/uploads/videos/${req.file.filename}`,
      duration: parseInt(duration) || 0,
      order: undefined // will be set below
    };
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    videoData.order = (course.videos?.length || 0) + 1;
    course.videos.push(videoData);
    await course.save();
    res.status(201).json({ success: true, video: videoData });
  } catch (error) {
    console.error('Add video error:', error);
    res.status(500).json({ success: false, error: 'Failed to add video' });
  }
});

// Update video
router.put('/courses/:courseId/videos/:videoId', async (req, res) => {
  try {
    const { title, description, duration } = req.body;
    const errors = {};
    if (title && title.trim().length < 3) errors.title = 'Video title must be at least 3 characters long';
    if (description && description.trim().length < 10) errors.description = 'Video description must be at least 10 characters long';
    if (duration && (isNaN(parseInt(duration)) || parseInt(duration) <= 0)) errors.duration = 'Duration must be a positive number';
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, error: 'Validation failed', errors });
    }
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    const video = course.videos.id(req.params.videoId);
    if (!video) {
      return res.status(404).json({ success: false, error: 'Video not found' });
    }
    if (title) video.title = title.trim();
    if (description) video.description = description.trim();
    if (duration !== undefined) video.duration = parseInt(duration) || 0;
    await course.save();
    res.json({ success: true, video });
  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({ success: false, error: 'Failed to update video' });
  }
});

// Delete video
router.delete('/courses/:courseId/videos/:videoId', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    const video = course.videos.id(req.params.videoId);
    if (!video) {
      return res.status(404).json({ success: false, error: 'Video not found' });
    }
    video.remove();
    await course.save();
    res.json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete video' });
  }
});

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const courses = await Course.find();
    const users = await User.find({ isActive: true });
    const stats = {
      totalCourses: courses.length,
      activeCourses: courses.filter(c => c.isActive).length,
      totalUsers: users.filter(u => u.role !== 'admin').length,
      schoolStudents: users.filter(u => u.role === 'school-student').length,
      collegeStudents: users.filter(u => u.role === 'college-student').length,
      employees: users.filter(u => u.role === 'employee').length,
      totalVideos: courses.reduce((total, course) => total + (course.videos?.length || 0), 0)
    };
    res.json({ success: true, stats });
  } catch (error) {
    console.error('Fetch stats error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
});

module.exports = router;