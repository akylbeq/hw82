import express from 'express';
import Track from "../models/Track";
import Album from "../models/Album";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
    try {
        const {album, artist} = req.query;

        if (album) {
            const tracks = await Track.find({album}).populate({
                path: 'album',
                populate: {
                    path: 'artist'
                }
            })

            return res.status(200).json(tracks);
        }

        if (artist) {
            const albums = await Album.find({artist});

            if (!albums) {
                return res.status(404).json({error: 'No such track found'});
            }

            const albumIds = albums.map(a => a._id);
            const tracks = await Track.find({ album: { $in: albumIds } });

            return res.status(200).json(tracks);
        }

        const tracks = await Track.find();

        res.status(200).json(tracks);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

tracksRouter.post('/', auth, async (req, res) => {
    try {
        const {album, name, duration} = req.body;

        const track = new Track({
            album,
            name,
            duration,
        });
        await track.save();
        res.status(200).json(track);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({error: error.message});
        }
        res.status(500).json({error: 'Internal Server Error'});
    }
});

tracksRouter.delete("/:id", auth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;

        const track = await Track.findByIdAndDelete(id);

        if (!track) {
            return res.status(404).json({error: 'No Track with this ID'});
        }

        res.status(200).json('Delete successfully');
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({error: error.message});
        }
        res.status(500).json({error: 'Internal Server Error'});
    }
});

tracksRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;

        const track = await Track.findById(id);

        if (!track) {
            return res.status(404).json({error: 'No Track with this ID'});
        }

        const update = await Track.findByIdAndUpdate(id, {isPublished: !track.isPublished}, {new: true})

        res.status(200).json(update);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({error: error.message});
        }
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export default tracksRouter;