import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import Track from "../models/Track";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post("/", async (req, res) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).send({ error: "No token provided" });
        }

        const user = await User.findOne({token: authorization});

        if (!user) {
            return res.status(401).send({ error: "Unauthorized" });
        }

        const track = await Track.findById(req.body.track);

        if (!track) {
            return res.status(404).send({ error: "Track not found" });
        }

        const trackHistory = new TrackHistory({
            user: user._id,
            track: track._id,
        });

        await trackHistory.save();

        res.status(200).send(trackHistory);
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).send({ error: err.message });
        }
        res.status(500).send({ error: "Server error" });
    }
});

export default trackHistoryRouter;
