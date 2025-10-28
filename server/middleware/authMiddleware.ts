import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';

//this file contains helper functions

// Middleware to check if user is authenticated
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Authentication required' });
};

// Middleware to check if user is not authenticated (for login/register pages)
export const requireGuest = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.status(403).json({ message: 'Already authenticated' });
};

// Function to verify and extract user from request (for use in controllers)
export const verifyUser = async (req: Request): Promise<User | null> => {
    if (!req.isAuthenticated()) {
        return null;
    }
    
    // The user is already deserialized by passport and attached to req.user
    const user = req.user as User;
    return user;
};
