import { useState } from 'react'
import { FILMSLIST } from '../../../../constants'
import { FilmModal } from '../../../components/FilmModal/FilmModal'
import { Slider } from '../../../components/Index'

import styles from './home.module.scss'

export const Home = () => {
  const [isModal, setIsModal] = useState(false)
  const [activeMovie, setActiveMovie] = useState({})

  const clickFilm = (movie) => {
    setActiveMovie(movie)
    setIsModal((prev) => !prev)
  }
  return (
    <>
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
                <img src={movie.posterUrl} alt="" />
                <h2>{movie.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModal && <FilmModal setIsModal={setIsModal} activeFilm={activeMovie} />}
    </>
  )
}
