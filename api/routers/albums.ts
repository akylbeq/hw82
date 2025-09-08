import express from "express";
import {uploadImage} from "../multer";
import Album from "../models/Album";

const albumsRouter = express.Router();

albumsRouter.get("/", async (req, res) => {
   try {
       const query = req.query.artist;

       if (query) {
           const albums = await Album.find({artist: query})
           return res.status(200).json(albums)
       }

       const albums = await Album.find();
       res.status(200).json(albums)
   } catch (error) {
       res.status(500).json({error: 'Internal Server Error'});
   }
});

albumsRouter.get("/:id", async (req, res) => {
   try {
       const album = await Album.findById(req.params.id).populate('artist');

       if (!album) {
           return res.status(404).json({error: 'Album not found'});
       }


       res.status(200).json(album)
   } catch (error) {
       res.status(500).json({error: 'Internal Server Error'});
   }
});

albumsRouter.post("/", uploadImage.single('image'), async (req, res) => {
    try {
        const {artist, name, releaseDate} = req.body;

        const album = await Album.create({
            artist,
            name,
            releaseDate,
            image: req.file ? 'images/' + req.file.filename : null,
        });

        await album.save();
        res.status(200).json(album);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({error: error.message});
        }

        res.status(500).json({error: 'Internal Server Error'});
    }
});

export default albumsRouter;