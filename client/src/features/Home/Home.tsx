import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {deleteArtistThunk, fetchArtists, publishArtistThunk} from "../ArtistPage/artistThunk.ts";
import {selectArtistLoading, selectArtists} from "../ArtistPage/artistSlice.ts";
import {Link} from "react-router-dom";
import {imgUrl} from "../../axiosApi.ts";
import {selectUser} from "../users/usersSlice.ts";
import {Button, CircularProgress} from "@mui/material";

const Home = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectArtistLoading);

    useEffect(() => {
        document.title = 'Music';
    }, []);

    const deleteArtist = async (id: string) => {
        await dispatch(deleteArtistThunk(id));
        await dispatch(fetchArtists());
    }

    const publishArtist = async (id: string) => {
        await dispatch(publishArtistThunk(id));
        await dispatch(fetchArtists());
    }

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    if (loading) return <CircularProgress />;
    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
            {artists.map((artist) => (
                <div
                    key={artist._id}
                    className="flex flex-col items-center p-4 transition-transform duration-200 bg-white border rounded-2xl shadow hover:scale-105 hover:shadow-cyan-500/40"
                >
                    <Link to={`/artists/${artist._id}`}>
                        <img
                            className="object-cover w-32 h-32 mb-3 rounded-full"
                            src={imgUrl + artist.image}
                            alt={artist.name}
                        />
                        <p className="text-lg font-semibold">{artist.name}</p>
                    </Link>
                    <div className="flex gap-2 mt-3">
                        {user?.role === "admin" && !artist.isPublished && (

                            <Button
                                variant="contained"
                                color="warning"
                                size="small"
                                sx={{ textTransform: "none", borderRadius: "10px" }}
                                onClick={() => publishArtist(artist._id)}
                            >
                                Publish
                            </Button>
                        )}
                        {
                            user?.role === "admin" && <Button
                                onClick={() => deleteArtist(artist._id)}
                                variant="contained"
                                color="error"
                                size="small"
                                sx={{ textTransform: "none", borderRadius: "10px" }}
                            >
                                Delete
                            </Button>
                        }

                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;