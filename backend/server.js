import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize environment variables
dotenv.config();

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173',  // React Vite frontend (during dev)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from React frontend (production build)
app.use(express.static(path.join(__dirname, 'frontend/my-react-app/dist')));

// API Routes
app.get('/api', (req, res) => {
  res.send('Backend API is working!');
});

// Serve React app (fallback to index.html for all routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/my-react-app/dist', 'index.html'));
});

// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
