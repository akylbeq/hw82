import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import type {TrackMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchAlbums} from "../Album/albumThunk.ts";
import {selectAlbums} from "../Album/albumSlice.ts";
import {selectArtists} from "../ArtistPage/artistSlice.ts";
import {fetchArtists} from "../ArtistPage/artistThunk.ts";
import {createTrack} from "./trackThunk.ts";

const AddTrack = () => {
    const [track, setTrack] = useState<TrackMutation>({
        album: '',
        duration: '',
        video: '',
        name: '',
    });
    const [artist, setArtist] = useState('')
    const albums = useAppSelector(selectAlbums);
    const artists = useAppSelector(selectArtists);
    const dispatch = useAppDispatch();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTrack(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleChange = (event: SelectChangeEvent) => {
        setTrack(prev => ({...prev, album: event.target.value as string}));
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await dispatch(createTrack(track)).unwrap();
    }

    useEffect(() => {
        dispatch(fetchAlbums(artist))
    }, [dispatch, artist]);


    useEffect(() => {
        dispatch(fetchAlbums());
        dispatch(fetchArtists());
    }, [dispatch]);


    return (
        <div>
            <form className="flex flex-col gap-3 w-2/4 mx-auto mt-20" onSubmit={onSubmit}>
                <Typography variant="h4" className="mb-2 flex justify-center">Add Track</Typography>
                <FormControl fullWidth>
                    <InputLabel id="artist-label">Artist</InputLabel>
                    <Select
                        value={artist}
                        onChange={async (e: SelectChangeEvent) => {
                            setArtist(e.target.value)
                        }}
                        required
                    >
                        {artists.map((a) => (
                            <MenuItem key={a._id} value={a._id}>{a.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="artist-label">Album</InputLabel>
                    <Select
                        labelId="artist-label"
                        id="artist-select"
                        value={track.album || ''}
                        onChange={handleChange}
                        required
                    >
                        {albums.map((a) => (
                            <MenuItem key={a._id} value={a._id}>{a.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField label="Name" required name="name"  onChange={onChange} value={track.name} />
                <TextField label="Duration" required name="duration"  onChange={onChange} value={track.duration} />
                <TextField label="Video query" required name="video"  onChange={onChange} value={track.video} />
                <Button type="submit" variant="contained">Save</Button>
            </form>
        </div>
    );
};

export default AddTrack;