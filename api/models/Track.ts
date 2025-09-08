import mongoose, {Schema} from "mongoose";

const TrackSchema = new Schema({
    album: {
        type: Schema.Types.ObjectId,
        ref: "Album",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    duration: String,
});

const Track = mongoose.model("Track", TrackSchema);
export default Track;