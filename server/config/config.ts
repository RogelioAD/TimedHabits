import dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    name: process.env.DB_NAME || 'timedhabits',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Password1!',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '989747703299-cn5a31c03bbmbho7r39kv3fb1cpkeo2r.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
  },
  session: {
    secret: process.env.SESSION_SECRET || 'your-super-secret-session-key-change-this-in-production',
  },
  server: {
    port: parseInt(process.env.PORT || '3001'),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
};
