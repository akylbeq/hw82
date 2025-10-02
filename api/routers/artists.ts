import express from "express";
import Artist from "../models/Artist";
import {uploadImage} from "../multer";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const artistsRouter = express.Router();

artistsRouter.get("/", async (req, res) => {
    try {
        const artists = await Artist.find();

        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

artistsRouter.post("/", auth, uploadImage.single('image'), async (req, res) => {
    try {
        const {name, description} = req.body;

        const artist = new Artist({
            name,
            description,
            image: req.file ? 'images/' + req.file.filename : null,
        });

        await artist.save();

        res.status(200).json(artist);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({error: error.message});
        }
        res.status(500).json({error: 'Internal Server Error'});
    }
});

artistsRouter.delete("/:id", auth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;

        const artist = await Artist.findByIdAndDelete(id);

        if (!artist) {
            return res.status(404).json({error: 'No Artist with this ID'});
        }

        res.status(200).json('Delete successfully');
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({error: error.message});
        }
        res.status(500).json({error: 'Internal Server Error'});
    }
});

artistsRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;

        const artist = await Artist.findById(id);

        if (!artist) {
            return res.status(404).json({error: 'No Artist with this ID'});
        }

        const update = await Artist.findByIdAndUpdate(id, {isPublished: !artist.isPublished}, {new: true})

        res.status(200).json(update);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({error: error.message});
        }
        res.status(500).json({error: 'Internal Server Error'});
    }
});

export default artistsRouter;