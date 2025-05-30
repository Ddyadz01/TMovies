import { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { FILMSLIST } from '../../../../constants'

import { FilmModal, Slider } from '../../../components/Index'

import styles from './home.module.scss'

export const Home = () => {
  const [isModal, setIsModal] = useState(false)
  const [activeMovie, setActiveMovie] = useState({})
  const [searchParams, setSearchParams] = useSearchParams()

  const clickFilm = (movie) => {
    setActiveMovie(movie)
    setIsModal(true)
    setSearchParams({
      id: movie.id,
      movie: movie.title,
    })
  }

  useEffect(() => {
    const paramTitle = searchParams.get('movie')
    const paramId = searchParams.get('id')
    if (paramTitle) {
      const movie = FILMSLIST.find((movie) => movie.id == paramId)
      clickFilm(movie)
    }
  }, [])

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
      {isModal && (
        <FilmModal
          setSearchParams={setSearchParams}
          setIsModal={setIsModal}
          activeFilm={activeMovie}
        />
      )}
    </>
  )
}
