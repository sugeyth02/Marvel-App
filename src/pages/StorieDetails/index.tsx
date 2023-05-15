import styles from './StorieDetails.module.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Character, Comic, IStorie } from '../../entities/IStorie';
import services from '../../services/service';
import { Creator } from '../../entities/IComic';

export default function StorieDetails() {
  const [story, setStory] = useState<IStorie>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await services.getStory(Number(id));
        setStory(response);
      } catch (err) {
      }
    };
    getData();
  }, [id]);
  return (
    <div className={styles.container}>
      <div
        className={styles.container__background}
        style={{
          backgroundImage: 'url(/img/marvel-background.jpg)',
        }}
      ></div>
      <i
        className={`fa-solid fa-circle-arrow-left ${styles.back}`}
        onClick={() => {
          navigate('/stories');
        }}
      ></i>
      <div className={styles.container__info}>
        <h1>
          <span>Title: </span>
          {story?.title}
        </h1>
        <p>
          <span>Modified: </span>
          {story?.modified}
        </p>
        <p>
          <span>Type: </span>
          {story?.type}
        </p>
        {story?.creators.items.map((creator: Creator) => (
          <p key={creator.name+1}>
            <span>{creator.role}: </span>
            {creator.name}{' '}
          </p>
        ))}
        <div className={styles.info__containers}>
          <div className={styles.container__comics}>
            <p>Characters:</p>
            {story?.characters.items.map((character: Character) => (
              <li className={styles.chip} key={character.name + 1}>
                {character.name}
              </li>
            ))}
          </div>
          <div className={styles.container__stories}>
            <p>Comics:</p>
            {story?.comics.items.map((comic: Comic) => (
              <li className={styles.chip} key={comic.name + 1}>
                {comic.name}
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
