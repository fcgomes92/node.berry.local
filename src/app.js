import express from 'express';
import {defineRoutes} from './routes';
const app = express();

defineRoutes(app);
app.use(express.static('./'));

export default app;
