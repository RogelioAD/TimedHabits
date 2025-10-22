
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/user';
import { config } from '../config/config';

// Configure Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists
        let user = await User.findOne({ where: { googleId: profile.id } });
        
        if (user) {
            return done(null, user);
        }
        
        // Create new user if doesn't exist
        user = await User.create({
            googleId: profile.id,
            email: profile.emails?.[0]?.value || '',
            displayName: profile.displayName || '',
            profilePicture: profile.photos?.[0]?.value || ''
        });
        
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Serialize user for session
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
