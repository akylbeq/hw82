import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));

const run = async () => {
    await mongoose.connect('mongodb://localhost/music');

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);

        process.on('exit', () => {
            mongoose.disconnect();
        });
    });
};

void run();