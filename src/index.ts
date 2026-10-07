import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from './UserRoute';
import cors from 'cors';
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
    console.error('MONGO_URL is not set');
    process.exit(1);
}

const PORTS = (process.env.PORTS ?? '3000,3001')
    .split(',')
    .map((p) => Number(p.trim()))
    .filter((p) => Number.isInteger(p) && p > 0);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

mongoose.connect(MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB');
    PORTS.forEach((port) => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

