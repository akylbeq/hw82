import mongoose, {Schema} from "mongoose";
import Album from "./Album";

const TrackSchema = new Schema({
    album: {
        type: Schema.Types.ObjectId,
        ref: "Album",
        required: true,
        validate: {
            validator: async (value: string) => {
                const album = await Album.findById(value);
                return Boolean(album);
            },
            message: 'Album not found',
        }
    },
    name: {
        type: String,
        required: true
    },
    duration: String,
    number: Number,
});

TrackSchema.pre('save', async function (next) {
    const tracks = await Track.find({album: this.album});
    if (tracks.length === 0) {
        this.number = 1;
        return next();
    }
    this.number = Number(tracks.length + 1);
})

const Track = mongoose.model("Track", TrackSchema);
export default Track;