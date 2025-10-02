export interface IArtist {
    _id: string;
    name: string;
    description: string;
    image: string;
    isPublished: boolean;
}

export interface ArtistMutation {
    name: string;
    description: string;
    image: File | null;
}

export interface IAlbum {
    artist: IArtist;
    name: string;
    releaseDate: string;
    image: string;
    _id: string;
    isPublished: boolean;
}

export interface AlbumMutation {
    name: string;
    artist: string;
    image: File | null;
    releaseDate: string;
}

export interface ITracks {
    _id: string;
    album: IAlbum;
    name: string;
    duration: string;
    number: number;
    video: string;
    isPublished: boolean;
}

export interface TrackMutation {
    album: string;
    name: string;
    duration: string;
    video: string;
}

export interface IUser {
    _id: string;
    username: string;
    token: string;
    role: string;
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