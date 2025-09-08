import express from "express";
import Artist from "../models/Artist";
import {uploadImage} from "../multer";

const artistsRouter = express.Router();

artistsRouter.get("/", async (req, res) => {
    try {
        const artists = await Artist.find();

        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

artistsRouter.post("/", uploadImage.single('image'), async (req, res) => {
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
})

export default artistsRouter;