import mongoose, {Schema} from "mongoose";

const AlbumSchema = new Schema({
    artist: {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    image: String,
});

const Album = mongoose.model("Album", AlbumSchema);
export default Album;