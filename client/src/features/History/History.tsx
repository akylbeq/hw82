import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {getSongs} from "./historyThunk.ts";
import {selectHistory, selectHistoryLoading} from "./historySlice.ts";
import {Card, CircularProgress} from "@mui/material";
import dayjs from "dayjs";
import {selectUser} from "../users/usersSlice.ts";
import {useNavigate} from "react-router-dom";

const History = () => {
    const dispatch = useAppDispatch()
    const history = useAppSelector(selectHistory)
    const user = useAppSelector(selectUser)
    const navigate = useNavigate()
    const loading = useAppSelector(selectHistoryLoading)

    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch])

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [navigate, user]);

    if (loading) {
        return <CircularProgress />
    }

    return (
        <div>
            {history && history.length > 0 ? (
                history.map((item) => (
                    <Card className="mb-1 p-2 flex justify-between" key={item._id}>
                        <p>{item.track.album.artist.name}</p>
                        <p>{item.track.name}</p>
                        <p>{dayjs(item.datetime).format('HH:mm DD.MM.YYYY')}</p>
                    </Card>
                ))
            ) : (
                <h1>Empty</h1>
            )}
        </div>
    );
};

export default History;