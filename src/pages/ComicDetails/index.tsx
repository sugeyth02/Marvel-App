import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageCard from '../../components/ImageCard';
import { Character, IComic, Storie} from '../../entities/IComic';
import services from '../../services/service';
import styles from './ComicDetails.module.scss';

export default function ComicDetails() {
  const [comic, setComic] = useState<IComic>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await services.getComic(Number(id));
        setComic(response);
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
          backgroundImage: `url(${comic?.thumbnail.path}/portrait_uncanny.jpg)`,
        }}
      ></div>
      <i
        className={`fa-solid fa-circle-arrow-left ${styles.back}`}
        onClick={() => {
          navigate('/comics');
        }}
      ></i>
      <ImageCard img={comic?.thumbnail.path || ''} />
      <div className={styles.container__info}>
        <h1>
          <span>Title: </span>
          {comic?.title}
        </h1>
        <p>
          <span>Modified: </span>
          {comic?.modified}
        </p>
        <p>
          <span>Variant: </span>
          {comic?.variantDescription}
        </p>
        <div className={styles.info__containers}>
          <div className={styles.container__comics}>
            <p>Characters:</p>
            {comic?.characters.items.map((character: Character) => (
              <li className={styles.chip} key={character.name + 1}>
                {character.name}
              </li>
            ))}
          </div>
          <div className={styles.container__stories}>
            <p>Stories:</p>
            {comic?.stories.items.map((story: Storie) => (
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
