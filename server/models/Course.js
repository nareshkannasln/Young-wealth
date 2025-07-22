// Mock data structure for courses
// This will be replaced with actual database models later

const { v4: uuidv4 } = require('uuid');

class Course {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.title = data.title;
    this.description = data.description;
    this.category = data.category; // 'school', 'college', 'employee'
    this.level = data.level; // 'beginner', 'intermediate', 'advanced'
    this.price = data.price || 0;
    this.duration = data.duration; // in minutes
    this.thumbnail = data.thumbnail;
    this.videos = data.videos || [];
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = new Date();
  }
}

// Mock database
let courses = [
  new Course({
    id: '1',
    title: 'Money Basics for School Students',
    description: 'Learn the fundamentals of money management',
    category: 'school',
    level: 'beginner',
    price: 0,
    duration: 120,
    thumbnail: '/uploads/thumbnails/money-basics.jpg',
    videos: [
      {
        id: '1',
        title: 'What is Money?',
        description: 'Understanding the concept of money',
        videoUrl: '/uploads/videos/what-is-money.mp4',
        duration: 15,
        order: 1
      },
      {
        id: '2',
        title: 'Saving vs Spending',
        description: 'Learn when to save and when to spend',
        videoUrl: '/uploads/videos/saving-vs-spending.mp4',
        duration: 20,
        order: 2
      }
    ]
  }),
  new Course({
    id: '2',
    title: 'Personal Budgeting for College Students',
    description: 'Master budgeting skills for college life',
    category: 'college',
    level: 'intermediate',
    price: 499,
    duration: 180,
    thumbnail: '/uploads/thumbnails/budgeting.jpg',
    videos: [
      {
        id: '3',
        title: 'Creating Your First Budget',
        description: 'Step-by-step guide to budgeting',
        videoUrl: '/uploads/videos/first-budget.mp4',
        duration: 25,
        order: 1
      }
    ]
  })
];

const CourseModel = {
  getAll: () => courses,
  
  getById: (id) => courses.find(course => course.id === id),
  
  getByCategory: (category) => courses.filter(course => course.category === category),
  
  create: (courseData) => {
    const course = new Course(courseData);
    courses.push(course);
    return course;
  },
  
  update: (id, updateData) => {
    const index = courses.findIndex(course => course.id === id);
    if (index !== -1) {
      courses[index] = { ...courses[index], ...updateData, updatedAt: new Date() };
      return courses[index];
    }
    return null;
  },
  
  delete: (id) => {
    const index = courses.findIndex(course => course.id === id);
    if (index !== -1) {
      const deleted = courses.splice(index, 1);
      return deleted[0];
    }
    return null;
  },
  
  addVideo: (courseId, videoData) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const video = {
        id: uuidv4(),
        ...videoData,
        order: course.videos.length + 1
      };
      course.videos.push(video);
      course.updatedAt = new Date();
      return video;
    }
    return null;
  },
  
  updateVideo: (courseId, videoId, updateData) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const videoIndex = course.videos.findIndex(v => v.id === videoId);
      if (videoIndex !== -1) {
        course.videos[videoIndex] = { ...course.videos[videoIndex], ...updateData };
        course.updatedAt = new Date();
        return course.videos[videoIndex];
      }
    }
    return null;
  },
  
  deleteVideo: (courseId, videoId) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      const videoIndex = course.videos.findIndex(v => v.id === videoId);
      if (videoIndex !== -1) {
        const deleted = course.videos.splice(videoIndex, 1);
        course.updatedAt = new Date();
        return deleted[0];
      }
    }
    return null;
  }
};

module.exports = CourseModel;