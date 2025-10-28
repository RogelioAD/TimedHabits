import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import passport from './middleware/passport';
import timedhabitsdb from './models/db';
import cors from 'cors';
import { config } from './config/config';
import authRoutes from './routes/authRoutes';
import habitsRoutes from './routes/habitsRoutes';

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true, // Allow cookies to be sent
};

const app = express();

// CORS configuration
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api/habits', habitsRoutes);

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Route not found' });
});

timedhabitsdb.sync().then(() => {
    console.log('Database & tables created!');
}
).catch((err: Error) => {
    console.error('Unable to sync database:', err);
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});