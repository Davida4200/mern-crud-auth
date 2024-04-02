import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('database_url')
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }
}