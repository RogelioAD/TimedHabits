import { Request, Response, NextFunction } from 'express';

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
