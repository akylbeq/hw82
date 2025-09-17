import mongoose, {Schema} from "mongoose";
import Artist from "./Artist";

const AlbumSchema = new Schema({
    artist: {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        required: true,
        validate: {
            validator: async (value: string) => {
                const isValid = await Artist.findById(value);
                return Boolean(isValid);
            },
            message: 'Artist not found.'
        }
    },
    name: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true,
        default: new Date(),
    },
    image: String,
});

const Album = mongoose.model("Album", AlbumSchema);
export default Album;