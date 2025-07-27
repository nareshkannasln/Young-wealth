const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { category, level } = req.query;
    let filter = { isActive: true };
    if (category) filter.category = category;
    if (level) filter.level = level;
    const courses = await Course.find(filter);
    res.json({
      success: true,
      courses
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
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
router.get('/category/:category', async (req, res) => {
  try {
    const courses = await Course.find({ category: req.params.category, isActive: true });
    res.json({
      success: true,
      courses
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

module.exports = router;