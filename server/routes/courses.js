const express = require('express');
const CourseModel = require('../models/Course');

const router = express.Router();

// Get all courses
router.get('/', (req, res) => {
  try {
    const { category, level } = req.query;
    let courses = CourseModel.getAll();

    if (category) {
      courses = courses.filter(course => course.category === category);
    }

    if (level) {
      courses = courses.filter(course => course.level === level);
    }

    res.json({
      success: true,
      courses: courses.filter(course => course.isActive)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get course by ID
router.get('/:id', (req, res) => {
  try {
    const course = CourseModel.getById(req.params.id);
    if (!course || !course.isActive) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({
      success: true,
      course
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Get courses by category
router.get('/category/:category', (req, res) => {
  try {
    const courses = CourseModel.getByCategory(req.params.category);
    res.json({
      success: true,
      courses: courses.filter(course => course.isActive)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

module.exports = router;