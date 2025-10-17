import express, { NextFunction, Request, Response } from 'express';
import timedhabitsdb from './models/db';
import cors from 'cors';

const corsOptions = {
    origin: ['http://localhost:3000'],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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