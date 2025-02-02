import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import http from 'http'

import { app } from './api/routes';

const exp = express();
const server = http.createServer(exp);

exp.use(express.json());

exp.use(cors());

exp.use(app);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

mongoose.connect("mongodb+srv://suzuki:1234567890@cluster0.5q2yg.mongodb.net/heroes-backend?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log('Connected to MongoDB')
    exp.listen(port, '0.0.0.0', () => {
        console.log(`Server listening on port ${port}`);
    })
})
