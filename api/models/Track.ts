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
});

const Track = mongoose.model("Track", TrackSchema);
export default Track;