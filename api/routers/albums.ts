import express from "express";
import {uploadImage} from "../multer";
import Album from "../models/Album";
import Track from "../models/Track";

const albumsRouter = express.Router();

albumsRouter.get("/", async (req, res) => {
   try {
       const {artist} = req.query;

       let albums = artist ? await Album.find({artist}).populate('artist').sort({releaseDate: -1}) : await Album.find();
       const albumWithCount = await Promise.all(
           albums.map(async (album) => {
               const count = await Track.countDocuments({album: album._id});
               return {
                   ...album.toObject(),
                   count,
               };
           })
       )
       res.status(200).json(albumWithCount)
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