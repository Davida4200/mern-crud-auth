import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://davida4200:panacea@cluster0.jnl9m2o.mongodb.net/mern-auth')
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }
}