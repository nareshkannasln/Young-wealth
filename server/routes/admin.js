const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const CourseModel = require('../models/Course');
const UserModel = require('../models/User');
const { authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

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

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = UserModel.getByEmail(email);
    if (!user || user.role !== 'admin') {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const isValidPassword = await UserModel.validatePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const { password: _, ...adminResponse } = user;

    res.json({
      success: true,
      admin: adminResponse
    });
  } catch (error) {
    res.status(500).json({ error: 'Admin login failed' });
  }
});

// Get all courses (admin view)
router.get('/courses', (req, res) => {
  try {
    const courses = CourseModel.getAll();
    res.json({
      success: true,
      courses
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Create new course
router.post('/courses', upload.single('thumbnail'), (req, res) => {
  try {
    const { title, description, category, level, price, duration } = req.body;
    
    const courseData = {
      title,
      description,
      category,
      level,
      price: parseFloat(price) || 0,
      duration: parseInt(duration) || 0,
      thumbnail: req.file ? `/uploads/thumbnails/${req.file.filename}` : null
    };

    const course = CourseModel.create(courseData);

    res.status(201).json({
      success: true,
      course
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Update course
router.put('/courses/:id', upload.single('thumbnail'), (req, res) => {
  try {
    const { title, description, category, level, price, duration, isActive } = req.body;
    
    const updateData = {
      title,
      description,
      category,
      level,
      price: parseFloat(price) || 0,
      duration: parseInt(duration) || 0,
      isActive: isActive === 'true'
    };

    if (req.file) {
      updateData.thumbnail = `/uploads/thumbnails/${req.file.filename}`;
    }

    const course = CourseModel.update(req.params.id, updateData);
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({
      success: true,
      course
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Delete course
router.delete('/courses/:id', (req, res) => {
  try {
    const course = CourseModel.delete(req.params.id);
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

// Add video to course
router.post('/courses/:courseId/videos', upload.single('video'), (req, res) => {
  try {
    const { title, description, duration } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'Video file is required' });
    }

    const videoData = {
      title,
      description,
      videoUrl: `/uploads/videos/${req.file.filename}`,
      duration: parseInt(duration) || 0
    };

    const video = CourseModel.addVideo(req.params.courseId, videoData);
    
    if (!video) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(201).json({
      success: true,
      video
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add video' });
  }
});

// Update video
router.put('/courses/:courseId/videos/:videoId', (req, res) => {
  try {
    const { title, description, duration } = req.body;
    
    const updateData = {
      title,
      description,
      duration: parseInt(duration) || 0
    };

    const video = CourseModel.updateVideo(req.params.courseId, req.params.videoId, updateData);
    
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({
      success: true,
      video
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update video' });
  }
});

// Delete video
router.delete('/courses/:courseId/videos/:videoId', (req, res) => {
  try {
    const video = CourseModel.deleteVideo(req.params.courseId, req.params.videoId);
    
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

// Get dashboard stats
router.get('/stats', (req, res) => {
  try {
    const courses = CourseModel.getAll();
    const users = UserModel.getAll();

    const stats = {
      totalCourses: courses.length,
      activeCourses: courses.filter(c => c.isActive).length,
      totalUsers: users.filter(u => u.role !== 'admin').length,
      schoolStudents: users.filter(u => u.role === 'school-student').length,
      collegeStudents: users.filter(u => u.role === 'college-student').length,
      employees: users.filter(u => u.role === 'employee').length,
      totalVideos: courses.reduce((total, course) => total + course.videos.length, 0)
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;