export interface ICharacter {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: IThumbnail;
  comics: Comics;
  stories: Stories;
  [key: string]: any;
}

 export interface IThumbnail {
  path: string;
  [key: string]: any;
}

interface Comics {
  items: Comic[];
  [key: string]: any;
}

export interface Comic {
  name: string;
  [key: string]: any;
}

interface Stories {
  items: Storie[];
  [key: string]: any;
}

export interface Storie {
  name: string;
  [key: string]: any;
}
