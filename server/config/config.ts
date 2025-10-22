import dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    name: process.env.DB_NAME || 'DB_NAME',
    user: process.env.DB_USER || 'DB_USER',
    password: process.env.DB_PASSWORD || 'DB_PASSWORD',
    host: process.env.DB_HOST || 'DB_HOST',
    port: parseInt(process.env.DB_PORT || 'DB_PORT'),
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_CLIENT_SECRET',
  },
  session: {
    secret: process.env.SESSION_SECRET || 'SESSION_SECRET',
  },
  server: {
    port: parseInt(process.env.PORT || 'PORT'),
    nodeEnv: process.env.NODE_ENV || 'NODE_ENV',
  },
};
