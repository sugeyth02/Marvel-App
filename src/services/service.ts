import { IBaseResponse } from '../entities/IBaseResponse';
import { ICharacter } from '../entities/ICharacter';
import { IComic } from '../entities/IComic';
import { IStorie } from '../entities/IStorie';
import axios from './axios';

interface IParams {
  limit?: number;
  offset?: string;
  comics?: string;
  stories?: string;
  characters?: string;
  format?: string;
  name?: string;
}

const services = {
  getCharacters: async (params: IParams) => {
    try {
      const response = await axios.get<IBaseResponse<ICharacter>>(
        'characters',
        {
          params,
        }
      );
      return {
        result: response.data.data.results, 
        count: response.data.data.total,
      };
    } catch (e) {
      throw e;
    }
  },
  getComics: async (params: IParams) => {
    try {
      const response = await axios.get<IBaseResponse<IComic>>('comics', {
        params,
      });
       return {
         result: response.data.data.results,
         count: response.data.data.total,
       };
    } catch (e) {
      throw e;
    }
  },
  getStories: async (params: IParams) => {
    try {
      const response = await axios.get<IBaseResponse<IStorie>>('stories', {
        params,
      });
      return {
        result: response.data.data.results,
        count: response.data.data.total,
      };
    } catch (e) {
      throw e;
    }
  },
  getCharacter: async (id: number) => {
    try {
      const response = await axios.get<IBaseResponse<ICharacter>>(
        `characters/${id}`
      );
      return response.data.data.results[0];
    } catch (e) {
      throw e;
    }
  },
  getComic: async (id: number) => {
    try {
      const response = await axios.get<IBaseResponse<IComic>>(`comics/${id}`);
      return response.data.data.results[0];
    } catch (e) {
      throw e;
    }
  },
  getStory: async (id: number) => {
    try {
      const response = await axios.get<IBaseResponse<IStorie>>(`stories/${id}`);
      return response.data.data.results[0];
    } catch (e) {
      throw e;
    }
  },
};

export default services;
