import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from './UserRoute';
import cors from 'cors';
const MONGO_URL = process.env.MONGO_URL as string;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

mongoose.connect(MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

