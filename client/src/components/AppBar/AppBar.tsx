import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/usersSlice.ts";
import {Button} from "@mui/material";

const AppBar = () => {
    const user = useAppSelector(selectUser);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && (location.pathname === '/login' || location.pathname === '/signup')) {
            navigate('/');
        }
    }, [user, location.pathname, navigate]);

    console.log(user)

    return (
        <div className="bg-slate-500 p-4 flex justify-between items-center">
            <Link to="/" className="text-3xl font-medium text-green-400">Music</Link>
            <div>
                {
                    user ? (
                        <div>
                            <Button variant="contained" component={Link} to="/track-history">History</Button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="text-lg font-medium text-white bg-blue-400 py-1 px-4 rounded-2xl">
                                Login
                            </Link>
                            <Link to="/signup" className="text-lg font-medium text-white py-1 px-4 rounded-2xl ml-1">
                                Signup
                            </Link>
                        </>
                    )
                }

            </div>
        </div>
    );
};

export default AppBar;
