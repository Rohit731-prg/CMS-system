import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDb } from './config/connectDb.js';
import blogRouter from './src/route/blog.route.js';
import pressRouter from './src/route/press.route.js';
import AdminRouter from './src/Admin/admin.route.js';
import CrewRouter from './src/route/crew.route.js';
import CustomerRouter from './src/route/customer.route.js';

const port = process.env.PORT;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json({
    limit: '50mb'
}));

app.use('/api/Admin', AdminRouter);
app.use('/api/blog', blogRouter);
app.use('/api/press', pressRouter);
app.use('/api/crew', CrewRouter);
app.use('/api/customer', CustomerRouter);

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.log(err);
});