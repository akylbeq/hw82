import { Link, useLocation, useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import { selectUser } from "../../features/users/usersSlice.ts";
import {Button, Menu, MenuItem} from "@mui/material";
import React from "react";
import {logout} from "../../features/users/usersThunk.ts";

const AppBar = () => {
    const user = useAppSelector(selectUser);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user && (location.pathname === '/login' || location.pathname === '/signup')) {
            navigate('/');
        }
    }, [user, location.pathname, navigate]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutFunc = async () => {
        await dispatch(logout());
    };

    return (
        <div className="bg-slate-500 p-4 flex justify-between items-center">
            <Link to="/" className="text-3xl font-medium text-green-400">Music</Link>
            <div>
                {
                    user ? (
                        <div>
                            <Button variant="contained" onClick={handleClick}>Menu</Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                slotProps={{
                                    list: {
                                        'aria-labelledby': 'basic-button',
                                    },
                                }}
                            >
                                <MenuItem component={Link} to="/track-history">History</MenuItem>
                                <MenuItem component={Link} to="/album/add">Add album</MenuItem>
                                <MenuItem component={Link} to="/artists/add">Add artist</MenuItem>
                                <MenuItem component={Link} to="/tracks/add">Add track</MenuItem>
                                <MenuItem onClick={logoutFunc}>Logout</MenuItem>
                            </Menu>
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
