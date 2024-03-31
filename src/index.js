import app from './app.js';
import { connectDB } from './db.js';

connectDB();
app.listen(8200)
console.log('Server is running on port 8200...')