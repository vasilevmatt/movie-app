import { Flex, Rate, Tag } from 'antd'
import './styles.scss'
import { format } from 'date-fns'
import { useContext, useState } from 'react'
import AppContext from '../../context/app-context.jsx'
import MovieService from '../../services/MovieService.js'

const getBorderColor = (formattedRating) => {
  if (formattedRating > 0 && formattedRating < 3) {
    return '#E90000'
  } else if (formattedRating >= 3 && formattedRating < 5) {
    return '#E97E00'
  } else if (formattedRating >= 5 && formattedRating < 7) {
    return '#E9D100'
  } else if (formattedRating >= 7) {
    return '#66E900'
  } else {
    return '#000000'
  }
}

function truncateOverview(overview, maxLength) {
  const truncated = overview.slice(0, maxLength)
  if (truncated.length !== overview.length) {
    const lastSpaceIndex = truncated.lastIndexOf(' ')
    return lastSpaceIndex !== -1 ? truncated.slice(0, lastSpaceIndex) + '...' : truncated
  }
  return overview
}

export default function MovieCard(props) {
  const { overview, poster_path, release_date, title, genre_ids, vote_average, id, rating } = props

  const [guestRating, setGuestRating] = useState(rating)

  const { genres, areGenresLoading, guestSession } = useContext(AppContext)
  function getGenreNameById(id) {
    if (areGenresLoading) return 'Loading...'
    const genre = genres.find((genre) => genre.id === id)
    return genre ? genre.name : 'Unknown genre'
  }

  const movieService = new MovieService()
  const ratingHandler = (rate) => {
    setGuestRating(rate)
    movieService.addRating(id, guestSession, rate)
  }

  const truncateLength = title.length >= 45 ? 130 : 170
  const truncatedOverview = truncateOverview(overview, truncateLength)

  const formattedReleaseDate = release_date ? format(new Date(release_date), 'PP') : 'Unknown date of release'

  const formattedRating = vote_average.toFixed(1)
  const ratingStyle = { border: `2px solid ${getBorderColor(formattedRating)}` }

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/original/${poster_path}`
    : 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg'

  return (
    <>
      <Flex vertical={false} className="movie-card">
        <img src={posterUrl} alt="" className="movie-card__image" />
        <div className="movie-card__text-part">
          <div className="movie-card__info">
            <div className="movie-card__header">
              <h5 className="movie-card__heading">{title}</h5>
              <div className="movie-card__current-rating" style={ratingStyle}>
                <span> {formattedRating}</span>
              </div>
            </div>
            <p className="movie-card__date">{formattedReleaseDate}</p>
            {genre_ids[0] && <Tag className="movie-card__genre">{getGenreNameById(genre_ids[0])}</Tag>}
            {genre_ids[1] && <Tag className="movie-card__genre">{getGenreNameById(genre_ids[1])}</Tag>}
            <p className="movie-card__description">{truncatedOverview}</p>
          </div>
          {guestSession && (
            <Rate
              className="movie-card__rate"
              allowHalf
              defaultValue={0}
              onChange={(rate) => ratingHandler(rate)}
              count={10}
              value={guestRating}
            />
          )}
        </div>
      </Flex>
    </>
  )
}
