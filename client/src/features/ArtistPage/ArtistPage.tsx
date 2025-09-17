import {Link, useParams} from 'react-router-dom';
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchAlbums} from "../Album/albumThunk.ts";
import {selectAlbums} from "../Album/albumSlice.ts";
import dayjs from 'dayjs';
import {imgUrl} from "../../axiosApi.ts";

const ArtistPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);

    if (albums.length > 0) {
        document.title = albums[0].artist.name;
    }

    useEffect(() => {
        if (id) {
            dispatch(fetchAlbums(id));
        }
    }, [dispatch, id])


    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
            {albums.map((album) => (
                <Link
                    key={album._id}
                    to={`/album/${album._id}`}
                    className="flex flex-col items-center p-4 transition-transform duration-200 bg-white border rounded-2xl shadow hover:scale-105 hover:shadow-cyan-500/40"
                >
                    <img
                        className="w-full mb-3"
                        src={imgUrl + album.image}
                        alt={album.name}
                    />
                    <p className="text-lg font-semibold">{album.name}</p>
                    <p className="text-sm">released: {dayjs(album.releaseDate).format('DD.MM.YYYY')}</p>
                    <span className="text-sm">total tracks: {album.count}</span>
                </Link>
            ))}
        </div>
    );
};

export default ArtistPage;