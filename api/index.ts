import express from 'express';
import mongoose from 'mongoose';
import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import tracksRouter from "./routers/tracks";
import userRouter from "./routers/user";
import trackhistory from "./routers/trackhistory";

const app = express();
const port = 8001;

app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/user', userRouter);
app.use('/history', trackhistory);

const run = async () => {
    await mongoose.connect('mongodb://localhost/music');

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

void run();