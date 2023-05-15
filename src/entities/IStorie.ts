export interface IStorie {
  id: number;
  title: string;
  type: string;
  modified: string;
  creators: Creators;
  characters: Characters;
  comics: Comics;
  [key: string]: any;
}

export interface Creators {
  items: Creator[]
  [key: string]: any;
}

export interface Creator {
  name: string;
  role: string;
  [key: string]: any;
}

export interface Characters {
  items: Character[];
  [key: string]: any;
}

export interface Character {
  [key: string]: any;
  name: string;
}

export interface Comics {
  items: Comic[];
  [key: string]: any;
}

export interface Comic {
  name: string;
  [key: string]: any;
}
