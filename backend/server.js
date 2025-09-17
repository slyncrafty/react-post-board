import express from 'express';
import mongoose from 'mongoose';

import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.js';
import { configurePassport } from './config/passport.js';


// Resolve __dirname for ESM and load .env from backend/config/.env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, './config/.env') });

// Optionally import and configure passport strategies if available
// import { configurePassport } from './config/passport.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
await connectDB();

// Middleware
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions stored in MongoDB
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
        cookie: {
            secure: false, // true if behind HTTPS in production
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);

// Passport
if (configurePassport) configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Health route
app.get('/api/health', (req, res) => {
    res.json({ ok: true });
});

// Routes 
app.use('/api/auth', authRoutes);
// app.use('/api/jobs', jobsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


