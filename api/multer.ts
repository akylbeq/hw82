import multer from "multer";
import path from "path";
import config from "./config";
import {promises as fs} from "fs";
import {randomUUID} from "node:crypto";

const imageStorage = multer.diskStorage({
    destination: async (req, file, callback) => {
        const desDir = path.join(config.publicPath, 'images');
        await fs.mkdir(desDir, { recursive: true });
        callback(null, desDir);
    },
    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname);
        const newFileName = randomUUID() + extension;
        callback(null, newFileName);
    }
});

export const uploadImage = multer({ storage: imageStorage });