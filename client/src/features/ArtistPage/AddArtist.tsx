import {Alert, Button, TextField} from "@mui/material";
import FileInput from "../../components/FileInput/FileInput.tsx";
import {type ChangeEvent, type FormEvent, useState} from "react";
import type {ArtistMutation} from "../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import {createArtist} from "./artistThunk.ts";

const AddArtist = () => {
    const [artist, setArtist] = useState<ArtistMutation>({
        name: '',
        description: '',
        image: null,
    });
    const dispatch = useAppDispatch();
    const [imgError, setImgError] = useState('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setArtist(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (file) {
            setArtist(prev => ({ ...prev, image: file[0] }));
        }
    }


    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!artist.image) {
            setImgError("Image is required");
        } else {
            await dispatch(createArtist(artist)).unwrap();
        }
    }

    return (
        <div>
            <form className="flex flex-col gap-1 w-2/4 mx-auto mt-20" onSubmit={onSubmit}>
                <TextField label="Name" required name="name"  onChange={onChange} value={artist.name} />
                <TextField label="Description" required name="description"  onChange={onChange} value={artist.description} />
                <FileInput onChange={onFileChange} name="image" label="image" />
                {
                    imgError &&  <Alert severity="error">{imgError}</Alert>
                }
                <Button type="submit" variant="contained">Save</Button>
            </form>
        </div>
    );
};

export default AddArtist;