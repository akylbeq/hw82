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
    album: IAlbum;
    name: string;
    duration: string;
    number: number;
}