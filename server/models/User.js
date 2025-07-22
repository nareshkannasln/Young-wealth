// Mock data structure for users
// This will be replaced with actual database models later

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

class User {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.fullName = data.fullName;
    this.email = data.email;
    this.password = data.password; // Will be hashed
    this.role = data.role; // 'school-student', 'college-student', 'employee', 'admin'
    this.schoolType = data.schoolType; // 'government', 'private' (for school students)
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = new Date();
  }
}

// Mock database
let users = [
  new User({
    id: '1',
    fullName: 'John Doe',
    email: 'john@student.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'school-student',
    schoolType: 'government'
  }),
  new User({
    id: '2',
    fullName: 'Jane Smith',
    email: 'jane@college.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'college-student'
  }),
  new User({
    id: 'admin',
    fullName: 'Admin User',
    email: 'admin@youngwealth.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin'
  })
];

const UserModel = {
  getAll: () => users,
  
  getById: (id) => users.find(user => user.id === id),
  
  getByEmail: (email) => users.find(user => user.email === email),
  
  create: async (userData) => {
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
      ...userData,
      password: hashedPassword
    });
    users.push(user);
    return user;
  },
  
  update: (id, updateData) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updateData, updatedAt: new Date() };
      return users[index];
    }
    return null;
  },
  
  delete: (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      const deleted = users.splice(index, 1);
      return deleted[0];
    }
    return null;
  },
  
  validatePassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
};

module.exports = UserModel;