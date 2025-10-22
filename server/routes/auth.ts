import express, { Request, Response } from 'express';
import passport from '../middleware/passport';
import { User } from '../models/user';

const router = express.Router();

// Google OAuth login route
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Google OAuth callback route
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
    (req: Request, res: Response) => {
        // Successful authentication, redirect to frontend
        res.redirect('http://localhost:3000/dashboard');
    }
);

// Logout route
router.post('/logout', (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

// Get current user route
router.get('/me', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        const user = req.user as User;
        res.json({
            user: {
                id: user?.id,
                email: user?.email,
                displayName: user?.displayName,
                profilePicture: user?.profilePicture
            }
        });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

// Check authentication status
router.get('/status', (req: Request, res: Response) => {
    const user = req.user as User;
    res.json({ 
        authenticated: req.isAuthenticated(),
        user: req.isAuthenticated() ? {
            id: user?.id,
            email: user?.email,
            displayName: user?.displayName,
            profilePicture: user?.profilePicture
        } : null
    });
});

export default router;
