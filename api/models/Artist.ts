import mongoose, {Schema} from "mongoose";

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => value.trim().length > 0,
            message: 'Please enter a valid name.'
        }
    },
    description: String,
    image: String,
});

const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;