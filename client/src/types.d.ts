export interface IArtist {
    _id: string;
    name: string;
    description: string;
    image: string;
}

export interface IAlbum {
    artist: IArtist;
    name: string;
    releaseDate: string;
    image: string;
    count: number;
    _id: string;
}

export interface ITracks {
    _id: string;
    album: IAlbum;
    name: string;
    duration: string;
    number: number;
    video: string;
}

export interface IUser {
    _id: string;
    username: string;
    token: string;
}

export interface UserMutation {
    username: string;
    password: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface IHistory {
    _id: string;
    user: string,
    track: ITracks,
    datetime: string,
}