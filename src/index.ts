import 'reflect-metadata';
import express, { json } from 'express';
import { createConnection } from 'typeorm';
import morgan from 'morgan';

import { TodoRoute } from './routes/TodoRoute';


const app = express();
const PORT = process.env.PORT || 5000;


app.use(morgan('dev'));
app.use(json());


app.use('/api', TodoRoute);

app.all('*', (_, res) => {
    res.status(404).json({ message: 'Not found' });
});


(async () => {

    try {
        const connection = await createConnection();

        if (connection.isConnected) {
            console.log('Connected to the database');
        }

        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
})();
