// Demo data for courses
const courses = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn React from scratch.",
    videos: [
      { id: 1, title: "Introduction", url: "https://demo.com/video1.mp4" },
      { id: 2, title: "JSX & Components", url: "https://demo.com/video2.mp4" }
    ],
    content: "Full course content goes here...",
    price: 49.99
  },
  {
    id: 2,
    title: "Advanced Node.js",
    description: "Deep dive into Node.js backend.",
    videos: [
      { id: 1, title: "Setup & Basics", url: "https://demo.com/video3.mp4" }
    ],
    content: "Node.js advanced topics...",
    price: 79.99
  }
];

module.exports = { courses };
