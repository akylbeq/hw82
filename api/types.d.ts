export interface UserFields {
    username: string;
    password: string;
    token: string;
    role: string;
}

export interface IAlbum {
    _id: string;
    artist: string;
    name: string;
    releaseDate: string;
    image: string;
}