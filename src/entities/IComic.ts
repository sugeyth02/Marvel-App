export interface IComic {
  id: number;
  title: string;
  variantDescription: string;
  modified: string;
  format: string;
  thumbnail: Thumbnail;
  creators: Creators;
  characters: Characters;
  stories: Stories;
  [key: string]: any;
}

export interface Thumbnail {
  path: string;
  [key: string]: any;
}

export interface Creators {
  items: Creator[];
  [key: string]: any;
}

export interface Creator {
  name: string;
  role: string;
  [key: string]: any;
}

export interface Characters {
  items: Character[] ;
  [key: string]: any;
}

export interface Character {
  [key: string]: any;
  name: string;
}

export interface Stories {
  items: Storie[] ;
  [key: string]: any;
}

export interface Storie {
  [key: string]: any;
  name: string;
  type: string;
}
