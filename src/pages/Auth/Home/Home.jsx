import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { FILMSLIST } from '../../../../constants';

import { FilmModal, Slider } from '../../../components/Index';

import styles from './home.module.scss';
import { useCurrentFilm } from '../../../store/store.js';

export const Home = () => {
  const [isModal, setIsModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const {  updateCurrentMovie } = useCurrentFilm((state) => state)


  const clickFilm = (movie) => {
    updateCurrentMovie(movie)
    setIsModal(true);
    setSearchParams({
      id: movie.id, movie: movie.title,
    });
  };

  useEffect(() => {
    const paramId = searchParams.get('id');
    if (paramId) {
      const movie = FILMSLIST.find((movie) => movie.id == paramId);
      clickFilm(movie);
    } else {
      setSearchParams({});
    }
  }, []);



  return (<>
    <div>
      <Slider />
      <div className={styles['category']}>
        <h1>Новинки</h1>
        <div className={styles['category--items']}>
          {FILMSLIST.map((movie) => (
            <div
              onClick={() => clickFilm(movie)}
              key={movie.id}
              className={styles['category--item']}
            >
              <div className={styles['category--item_content']}>
                <img src={movie.posterUrl}
                     alt="" />
                <h2>{movie.title}</h2>
              </div>
            </div>))}
        </div>
      </div>
    </div>
    {isModal && (<FilmModal
      setSearchParams={setSearchParams}
      setIsModal={setIsModal}
    />)}
  </>);
};
