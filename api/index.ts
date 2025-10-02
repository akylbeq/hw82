import express from 'express';
import mongoose from 'mongoose';
import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import tracksRouter from "./routers/tracks";
import usersRouter from "./routers/users";
import trackhistory from "./routers/trackhistory";
import cors from "cors";
import config from "./config";

const app = express();
const port = 8001;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/history', trackhistory);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

void run();