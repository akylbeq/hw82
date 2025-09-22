import { Button, Snackbar, TextField, Typography } from "@mui/material";
import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import type { UserMutation } from "../../types";
import { signup } from "./usersThunk.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {clearError, selectError} from "./usersSlice.ts";

const Signup = () => {
    const [userMutation, setUserMutation] = useState<UserMutation>({
        username: "",
        password: "",
    });

    const dispatch = useAppDispatch();
    const errorMsg = useAppSelector(selectError);
    const [open, setOpen] = useState(false);

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserMutation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userMutation.username && userMutation.password) {
            await dispatch(signup(userMutation));
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
                open={open || Boolean(errorMsg)}
                message={errorMsg ? errorMsg.error : "Заполните все поля!"}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            />
            <form onSubmit={onSubmit} className="flex flex-col lg:max-w-1/3 gap-5">
                <Typography variant="h5" className="text-center font-bold">
                    Sign Up
                </Typography>
                <TextField
                    variant="outlined"
                    label="username"
                    name="username"
                    onChange={onHandleChange}
                    value={userMutation.username}
                />
                <TextField
                    variant="outlined"
                    label="password"
                    type="password"
                    name="password"
                    onChange={onHandleChange}
                    value={userMutation.password}
                />
                <Button variant="contained" type="submit">
                    Register
                </Button>
            </form>
        </div>
    );
};

export default Signup;
