import {
    Alert,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
    TextField
} from "@mui/material";
import FileInput from "../../components/FileInput/FileInput.tsx";
import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import type {AlbumMutation} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectArtists} from "../ArtistPage/artistSlice.ts";
import {fetchArtists} from "../ArtistPage/artistThunk.ts";
import {createAlbum} from "./albumThunk.ts";

const AddAlbum = () => {
    const [album, setAlbum] = useState<AlbumMutation>({
        name: '',
        artist: '',
        releaseDate: '',
        image: null
    });
    const artists = useAppSelector(selectArtists);
    const dispatch = useAppDispatch();
    const [imgError, setImgError] = useState('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAlbum(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (file) {
            setAlbum(prev => ({ ...prev, image: file[0] }));
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setAlbum(prev => ({...prev, artist: event.target.value as string}));
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!album.image) {
            setImgError("Image is required");
        } else {
            await dispatch(createAlbum(album)).unwrap();
        }
    }

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    return (
        <div>
            <form className="flex flex-col gap-1 w-2/4 mx-auto mt-20" onSubmit={onSubmit}>
                <TextField label="Name" required name="name"  onChange={onChange} value={album.name} />
                <FormControl fullWidth>
                    <InputLabel id="artist-label">Artist</InputLabel>
                    <Select
                        labelId="artist-label"
                        id="artist-select"
                        value={album.artist || ''}
                        onChange={handleChange}
                        required
                    >
                        {artists.map((a) => (
                            <MenuItem key={a._id} value={a._id}>{a.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FileInput onChange={onFileChange} name="image" label="image" />
                {
                    imgError &&  <Alert severity="error">{imgError}</Alert>
                }

                <TextField type="date" name="releaseDate" onChange={onChange} value={album.releaseDate} required />
                <Button type="submit" variant="contained">Save</Button>
            </form>
        </div>
    );
};

export default AddAlbum;