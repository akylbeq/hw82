import {Link, useParams} from 'react-router-dom';
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {deleteAlbum, fetchAlbums, publishAlbum} from "../Album/albumThunk.ts";
import {selectAlbumLoading, selectAlbums} from "../Album/albumSlice.ts";
import dayjs from 'dayjs';
import {imgUrl} from "../../axiosApi.ts";
import {selectUser} from "../users/usersSlice.ts";
import {Button, CircularProgress} from "@mui/material";

const ArtistPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectAlbumLoading)

    if (albums.length > 0) {
        document.title = albums[0].artist.name;
    }

    const publish = async (album: string) => {
        await dispatch(publishAlbum(album));
        await dispatch(fetchAlbums(id));
    }

    const deleteAlbumFunc = async (album: string) => {
        await dispatch(deleteAlbum(album));
        await dispatch(fetchAlbums(id));
    }

    useEffect(() => {
        if (id) {
            dispatch(fetchAlbums(id));
        }
    }, [dispatch, id])

    if (loading) return <CircularProgress />;

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
            {albums.length > 0 ? (
                albums.map((album) => (
                    <div
                        key={album._id}
                        className="relative flex flex-col items-center p-4 transition-transform duration-200 bg-white border rounded-2xl shadow hover:scale-105 hover:shadow-cyan-500/40"
                    >
                        <div className="relative w-full mb-3 overflow-hidden rounded-lg">
                            {!album.isPublished && user?.role === "admin" && (
                                <span className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-md shadow">
        Not public
      </span>
                            )}
                            <Link to={`/album/${album._id}`}>
                                <img
                                    className="w-full transition duration-200 hover:opacity-90"
                                    src={imgUrl + album.image}
                                    alt={album.name}
                                />
                            </Link>
                        </div>

                        <Link to={`/album/${album._id}`} className="text-center">
                            <p className="text-lg font-semibold">{album.name}</p>
                            <p className="text-sm text-gray-500">
                                released: {dayjs(album.releaseDate).format("DD.MM.YYYY")}
                            </p>
                        </Link>

                            <div className="flex gap-2 mt-3">
                                {user?.role === "admin" && !album.isPublished && (

                                <Button
                                    variant="contained"
                                    color="warning"
                                    size="small"
                                    sx={{ textTransform: "none", borderRadius: "10px" }}
                                    onClick={() => publish(album._id)}
                                >
                                    Publish
                                </Button>
                                )}
                                {
                                    user?.role === "admin" && <Button
                                        onClick={() => deleteAlbumFunc(album._id)}
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

                ))
            ) : <h1>No albums</h1>}
        </div>
    );
};

export default ArtistPage;