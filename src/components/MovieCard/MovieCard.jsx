import { Flex, Tag } from 'antd'
import './styles.scss'
import { format } from 'date-fns'

function truncateOverview(overview, maxLength) {
  const truncated = overview.slice(0, maxLength)
  if (truncated.length !== overview.length) {
    const lastSpaceIndex = truncated.lastIndexOf(' ')
    return lastSpaceIndex !== -1 ? truncated.slice(0, lastSpaceIndex) + '...' : truncated
  }
  return overview
}

export default function MovieCard(props) {
  const { overview, poster_path, release_date, title } = props

  const truncatedOverview = truncateOverview(overview, 200)

  const formattedReleaseDate = release_date ? format(new Date(release_date), 'PP') : 'Unknown date of release'

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/original/${poster_path}`
    : 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg'

  return (
    <>
      <Flex vertical={false} className="movie-card">
        <img src={posterUrl} alt="" className="movie-card__image" />
        <div className="movie-card__info">
          <h5 className="movie-card__heading">{title}</h5>
          <p className="movie-card__date">{formattedReleaseDate}</p>
          <Tag className="movie-card__genre">Action</Tag>
          <Tag className="movie-card__genre">Drama</Tag>
          <p className="movie-card__description">{truncatedOverview}</p>
        </div>
      </Flex>
    </>
  )
}
