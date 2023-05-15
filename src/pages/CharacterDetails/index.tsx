import styles from './CharacterDetails.module.scss';
import React, { useEffect, useState } from 'react';
import ImageCard from '../../components/ImageCard';
import { useNavigate, useParams } from 'react-router-dom';
import { Comic, ICharacter, Storie } from '../../entities/ICharacter';
import services from '../../services/service';

export default function CharacterDetails() {
  const [character, setCharacter] = useState<ICharacter>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await services.getCharacter(Number(id));
        setCharacter(response);
      } catch (err) {}
    };
    getData();
  }, [id]);

  return (
    <div className={styles.container}>
      <div
        className={styles.container__background}
        style={{
          backgroundImage: `url(${character?.thumbnail.path}/portrait_uncanny.jpg)`,
        }}
      ></div>
      <i
        className={`fa-solid fa-circle-arrow-left ${styles.back}`}
        onClick={() => {
          navigate('/characters');
        }}
      ></i>
      <ImageCard img={character?.thumbnail.path || ''} />
      <div className={styles.container__info}>
        <h1>
          <span>Name: </span>
          {character?.name}
        </h1>
        <p>
          <span>Modified: </span>
          {character?.modified}
        </p>

        <div className={styles.info__containers}>
          <p>Comics:</p>
          <div className={styles.container__comics}>
            {character?.comics.items.map((comic: Comic) => (
              <li className={styles.chip} key={comic.name + 1}>
                {comic.name}
              </li>
            ))}
          </div>
          <p>Stories:</p>
          <div className={styles.container__stories}>
            {character?.stories.items.map((story: Storie) => (
              <li className={styles.chip} key={story.name + 1}>
                {story.name}
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
