import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {fetchArtists} from "../ArtistPage/artistThunk.ts";
import {selectArtists} from "../ArtistPage/artistSlice.ts";
import {Link} from "react-router-dom";
import {imgUrl} from "../../axiosApi.ts";

const Home = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);


    useEffect(() => {
        document.title = 'Music';
    }, []);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch])
    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
            {artists.map((artist) => (
                <Link
                    key={artist._id}
                    to={`/artists/${artist._id}`}
                    className="flex flex-col items-center p-4 transition-transform duration-200 bg-white border rounded-2xl shadow hover:scale-105 hover:shadow-cyan-500/40"
                >
                    <img
                        className="object-cover w-32 h-32 mb-3 rounded-full"
                        src={imgUrl + artist.image}
                        alt={artist.name}
                    />
                    <p className="text-lg font-semibold">{artist.name}</p>
                </Link>
            ))}
        </div>
    );
};

export default Home;