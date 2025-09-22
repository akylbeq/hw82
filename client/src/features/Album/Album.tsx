import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect, useRef } from "react";
import { fetchAlbumTracks } from "./albumThunk.ts";
import { useParams } from "react-router-dom";
import { selectTracks } from "./albumSlice.ts";
import { selectUser } from "../users/usersSlice.ts";
import { IconButton } from "@mui/material";
import { playSong } from "../History/historyThunk.ts";
import YouTube, { YouTubePlayer } from "react-youtube";

const Album = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const tracks = useAppSelector(selectTracks);
    const user = useAppSelector(selectUser);

    const playersRef = useRef<Record<string, YouTubePlayer>>({});

    if (tracks.length > 0) {
        document.title = tracks[0].album.artist.name;
    }

    const play = (trackId: string) => {
        dispatch(playSong(trackId));
        const player = playersRef.current[trackId];
        if (player) {
            player.playVideo();
        }
    };

    const onPlayerReady = (trackId: string, event: any) => {
        playersRef.current[trackId] = event.target;
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchAlbumTracks(id));
        }
    }, [id, dispatch]);

    return (
        <div>
            {tracks.length > 0 && <h1 className="text-5xl my-5">{tracks[0].album.name}</h1>}
            {tracks.length > 0 ? (
                tracks.map((track) => (
                    <div className="border flex flex-col mb-4 p-2" key={track._id}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="bg-amber-300 py-1 px-3 text-white text-lg">{track.number}</span>
                            <p className="text-lg">{track.name}</p>
                            <span className="mr-1">{track.duration}</span>
                            {user && track.video && (
                                <IconButton onClick={() => play(track._id)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </IconButton>
                            )}
                        </div>

                        {track.video && user && (
                            <YouTube
                                videoId={track.video}
                                opts={{
                                    height: "0",
                                    width: "0",
                                    playerVars: {
                                        autoplay: 0,
                                        controls: 0,
                                    },
                                }}
                                onReady={(event) => onPlayerReady(track._id, event)}
                            />
                        )}
                    </div>
                ))
            ) : (
                <div className="flex items-center justify-center h-[calc(100vh-90px)]">
                    <h1 className="text-5xl">No tracks</h1>
                </div>
            )}
        </div>
    );
};

export default Album;
