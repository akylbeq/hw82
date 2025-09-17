import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {fetchAlbumTracks} from "./albumThunk.ts";
import {useParams} from "react-router-dom";
import {selectTracks} from "./albumSlice.ts";

const Album = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const tracks = useAppSelector(selectTracks);

    if (tracks.length > 0) {
        document.title = tracks[0].album.artist.name;
    }

    useEffect(() => {
        if (id) {
            dispatch(fetchAlbumTracks(id));
        }
    }, [id, dispatch]);
    return (
        <div>
            {tracks.length > 0 && <h1 className="text-5xl my-5">{tracks[0].album.name}</h1>}
            {
                tracks.length > 0 ? (
                    tracks.map((track) => (
                        <div className="border flex justify-between items-center mb-1">
                            <span className="bg-amber-300 py-1 px-3 text-white text-lg">{track.number}</span>
                            <p className="text-lg">{track.name}</p>
                            <span className="mr-1">{track.duration}</span>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-[calc(100vh-90px)]">
                        <h1 className="text-5xl">No tracks</h1>
                    </div>
                )
            }
        </div>
    );
};

export default Album;