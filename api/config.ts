import path from 'path';

const rootPath = __dirname;

const config = {
    db: 'mongodb://localhost/music',
    rootPath,
    publicPath: path.join(rootPath, 'public'),
}

export default config;