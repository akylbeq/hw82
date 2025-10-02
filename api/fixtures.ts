import mongoose from 'mongoose';
import config from './config';
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";
import {randomUUID} from "node:crypto";

const run = async () => {

    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
        await db.dropCollection('users')
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [theWeekend, trevor, weekend3] = await Artist.create({
        name: "The Weekend",
        description: "Most popular artist",
        image: 'images/img.png',
        isPublished: true,
    }, {
        name: "The Weekend 2",
        description: "Most popular artist 2",
        image: 'images/img_1.png',
        isPublished: true,
    }, {
        name: "The Weekend 3",
        description: "Most popular artist 3",
        image: 'images/img_6.png',
        isPublished: false,
    });

    const [starboy, idol, afterHours, hurryUp, weekend3Album] = await Album.create([
        {
            artist: theWeekend._id,
            name: 'Starboy',
            image: "images/img_2.png",
            releaseDate: new Date("2016-11-25T00:00:00.000Z"),
            isPublished: true,
        },
        {
            artist: theWeekend._id,
            name: 'The Idol',
            image: "images/img_3.png",
            releaseDate: new Date("2023-06-30T00:00:00.000Z"),
            isPublished: true,
        },
        {
            artist: trevor._id,
            name: 'After Hours',
            image: "images/img_4.png",
            releaseDate: new Date("2020-03-20T00:00:00.000Z"),
            isPublished: true,
        },
        {
            artist: trevor._id,
            name: 'Hurry Up Tomorrow',
            image: "images/img_5.png",
            releaseDate: new Date("2025-10-09T18:00:00.000Z"),
            isPublished: true,
        },
        {
            artist: weekend3._id,
            name: 'Weekend album 3',
            image: "images/img_7.png",
            releaseDate: new Date("2025-06-30T00:00:00.000Z"),
            isPublished: false,
        }
    ]);

    await Track.create([
        { album: starboy._id, name: "Starboy - Track 1", duration: "3:21", number: 1, video: "rybU1VuiHrQ", isPublished: true },
        { album: starboy._id, name: "Starboy - Track 2", duration: "4:12", number: 2, video: "rybU1VuiHrQ", isPublished: true },
        { album: starboy._id, name: "Starboy - Track 3", duration: "2:58", number: 3, video: "rybU1VuiHrQ", isPublished: true },
        { album: starboy._id, name: "Starboy - Track 4", duration: "3:45", number: 4, video: "rybU1VuiHrQ", isPublished: true },
        { album: starboy._id, name: "Starboy - Track 5", duration: "4:05", number: 5, video: "rybU1VuiHrQ", isPublished: true },

        { album: idol._id, name: "The Idol - Track 1", duration: "3:10", number: 1, video: "rybU1VuiHrQ", isPublished: true },
        { album: idol._id, name: "The Idol - Track 2", duration: "2:55", number: 2, video: "rybU1VuiHrQ", isPublished: true },
        { album: idol._id, name: "The Idol - Track 3", duration: "4:20", number: 3, video: "rybU1VuiHrQ", isPublished: true },
        { album: idol._id, name: "The Idol - Track 4", duration: "3:40", number: 4, video: "rybU1VuiHrQ", isPublished: true },
        { album: idol._id, name: "The Idol - Track 5", duration: "3:05", number: 5, video: "rybU1VuiHrQ", isPublished: true },

        { album: afterHours._id, name: "After Hours - Track 1", duration: "3:50", number: 1, video: "rybU1VuiHrQ", isPublished: true },
        { album: afterHours._id, name: "After Hours - Track 2", duration: "4:15", number: 2, video: "rybU1VuiHrQ", isPublished: true },
        { album: afterHours._id, name: "After Hours - Track 3", duration: "3:30", number: 3, video: "rybU1VuiHrQ", isPublished: true },
        { album: afterHours._id, name: "After Hours - Track 4", duration: "2:59", number: 4, video: "rybU1VuiHrQ", isPublished: true },
        { album: afterHours._id, name: "After Hours - Track 5", duration: "4:45", number: 5, video: "rybU1VuiHrQ", isPublished: true },

        { album: hurryUp._id, name: "Hurry Up Tomorrow - Track 1", duration: "3:15", number: 1, video: "rybU1VuiHrQ", isPublished: true },
        { album: hurryUp._id, name: "Hurry Up Tomorrow - Track 2", duration: "2:48", number: 2, video: "rybU1VuiHrQ", isPublished: true },
        { album: hurryUp._id, name: "Hurry Up Tomorrow - Track 3", duration: "4:05", number: 3, video: "rybU1VuiHrQ", isPublished: true },
        { album: hurryUp._id, name: "Hurry Up Tomorrow - Track 4", duration: "3:55", number: 4, video: "rybU1VuiHrQ", isPublished: true },
        { album: hurryUp._id, name: "Hurry Up Tomorrow - Track 5", duration: "4:10", number: 5, video: "rybU1VuiHrQ", isPublished: true },

        { album: weekend3Album._id, name: "Save - Track 1", duration: "4:05", number: 1, video: "rybU1VuiHrQ", isPublished: false },
        { album: weekend3Album._id, name: "Save - Track 2", duration: "3:55", number: 2, video: "rybU1VuiHrQ", isPublished: false },
        { album: weekend3Album._id, name: "Save - Track 3", duration: "4:10", number: 3, video: "rybU1VuiHrQ", isPublished: false },
    ]);

    await User.create(
        {
            username: "user",
            password: "123",
            token: randomUUID(),
        },
        {
            username: "admin",
            password: "123",
            role: 'admin',
            token: randomUUID(),
        }
    )

    await db.close();
};



run().catch(console.error);