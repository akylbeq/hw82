import express from "express";
import User from "../models/User";

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
    try {

        if (!req.body.username.trim() || !req.body.password.trim()) {
            return res.status(400).send({error: "Username and password are required"});
        }

        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        user.generateToken();
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).send({error: err.message});
        }
        res.status(500).send({error: 'server error'});
    }
});

userRouter.post('/session', async (req, res) => {
    try {
        if (!req.body.username.trim() || !req.body.password.trim()) {
            return res.status(400).send({error: "Username and password are required"});
        }

        const user = await User.find({username: req.body.username});

        if (!user) {
            return res.status(400).send({error: "User does not exist"});
        }

        const isMath = await user[0].checkPassword(req.body.password);

        if (!isMath) {
            return res.status(400).send({error: "Incorrect password"});
        }

        user[0].generateToken();
        await user[0].save();
        res.status(200).json(user);

    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).send({error: err.message});
        }
        res.status(500).send({error: 'server error'});
    }
})

export default userRouter;