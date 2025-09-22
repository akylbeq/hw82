import {Button, Snackbar, TextField, Typography} from "@mui/material";
import {type ChangeEvent, useEffect, useState} from "react";
import type {UserLogin} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {login} from "./usersThunk.ts";
import {clearError, selectError} from "./usersSlice.ts";

const Login = () => {
    const [userAuthorization, setUserAuthorization] = useState<UserLogin>({
        username: '',
        password: '',
    });
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const errorMsg = useAppSelector(selectError);

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserAuthorization(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userAuthorization.username && userAuthorization.password) {
            await dispatch(login(userAuthorization));
        } else {
            setOpen(true);
        }
    };

    useEffect(() => {
        if (errorMsg) {
            setOpen(true);
        }
    }, [errorMsg]);

    useEffect(() => {
        dispatch(clearError())
    }, []);

    return (
        <div className="flex items-center justify-center h-[calc(100vh-90px)]">
            <Snackbar
                open={open && Boolean(errorMsg)}
                message={errorMsg ? errorMsg.error : 'Please enter username and password'}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            />
            <form onSubmit={onSubmit} className="flex flex-col lg:max-w-1/3 gap-5">
                <Typography variant="h5" className="text-center font-bold">Login</Typography>
                <TextField
                    variant="outlined"
                    label="username"
                    name="username"
                    value={userAuthorization.username}
                    onChange={onHandleChange}
                />
                <TextField
                    variant="outlined"
                    label="password"
                    type="password"
                    name="password"
                    value={userAuthorization.password}
                    onChange={onHandleChange}
                />
                <Button type="submit" variant="contained">Login</Button>
            </form>
        </div>
    );
};

export default Login;
