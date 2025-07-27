
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['school-student', 'college-student', 'employee', 'admin'], required: true },
  schoolType: { type: String, enum: ['government', 'private'], required: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.updatedAt = new Date();
  next();
});

UserSchema.methods.validatePassword = async function(plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

UserSchema.statics.getById = async function(id) {
  return this.findById(id);
};

UserSchema.statics.getByEmail = async function(email) {
  return this.findOne({ email: email.toLowerCase().trim() });
};

UserSchema.statics.validatePassword = async function(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;