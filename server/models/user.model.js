// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
  // fullName: {
  //   type: String,
  //   required: [true, 'Full name is required'],
  //   trim: true,
  // },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: 6,
//     select: false, // hide password in queries
//   },
// }, { timestamps: true });

// // Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Method to compare password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model('User', userSchema);
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  title: { type: String, required: true },
  from: { type: String, required: true },  // e.g., "2018"
  to: { type: String, default: 'Present' }, // or a year
  duration: { type: String },              // e.g., "5 years"
}, { _id: false });

const departments = [
  "Human Resources", "Engineering", "Finance", "Marketing", "Sales",
  "Customer Support", "IT Support", "Legal", "Logistics",
  "Research & Development", "Procurement", "Administration"
];

const managers = [
  "Ayesha Khan",
  "Rahul Mehra",
  "Imran Sheikh",
  "Pooja Sharma",
  "Arif Ansari",
  "Neha Verma",
  "Zaid Qureshi",
  "Kavita Iyer",
  "Faizan Ali",
  "Rohan Desai",
  "Mohammad Faheem",
  "Sunita Rao"
];


const userSchema = new mongoose.Schema({
  fullName: { type: String, required: [true, 'Full name is required'], trim: true,},
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  bio: { type: String },
  jobTitle: { type: String },
  department: { type: String, enum: departments },
  manager: { type: String, enum: managers },
  officeLocation: { type: String },
  skills: [{ type: String }],
  professionalExperience: [experienceSchema],
  password: { type: String, required: [true, 'Password is required'], minlength: 6, select: false },
}, { timestamps: true });

// 🔐 Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔑 Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🗓️ Virtual joined field
userSchema.virtual('joined').get(function () {
  return new Date(this.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long'
  });
});

userSchema.set('toJSON', { virtuals: true });

export default mongoose.model('User', userSchema);
