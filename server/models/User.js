// server/models/User.js should be converted to a proper Mongoose schema
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['school-student', 'college-student', 'employee', 'admin'],
    required: true 
  },
  schoolType: { 
    type: String, 
    enum: ['government', 'private'],
    required: function() { return this.role === 'school-student'; }
  },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving user
userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare given password with the database password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;