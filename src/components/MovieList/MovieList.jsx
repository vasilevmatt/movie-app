import { useState, useEffect, useCallback, useContext } from 'react'
import { debounce } from 'lodash'
import MovieService from '../../services/MovieService'
import { Flex, notification, Pagination, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import MovieCard from '../MovieCard/MovieCard'
import './index.scss'
import ErrorAlert from '../utils/ErrorAlert'
import WarningAlert from '../utils/WarningAlert'
import AppContext from '../../context/app-context'

const LoadingIndicator = () => (
  <Spin className="search__loading" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
)

const SearchInput = ({ value, onChange }) => (
  <input className="search__input" type="text" value={value} onChange={onChange} placeholder="Type to search..." />
)

export default function MovieList() {
  const [searchValue, setSearchValue] = useState('return')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResultsNum, setTotalResultsNum] = useState(0)

  const { hasError, error, activeTab, guestSession } = useContext(AppContext)

  const movieService = new MovieService()
  const getResponse = async (value, pageNumber) => {
    try {
      const rated = activeTab === 2
      const res = rated
        ? await movieService.searchRatedMovie(pageNumber, guestSession)
        : await movieService.searchMovie(value, pageNumber)
      setTotalResultsNum(res.total_results)
      if (res.total_results === 0) {
        setLoading(false)
        setMovies(0)
      } else {
        setMovies(res.results.map((item) => <MovieCard {...item} key={item.id} />))
        setLoading(false)
      }
    } catch (e) {
      setLoading(false)
      console.log(e)
      if (e == 'Error: 404') openNotification()
      error(true)
      setMovies([])
    }
  }
  const [api, contextHolder] = notification.useNotification()
  const openNotification = () => {
    api.open({
      message: 'No movies found',
      description:
        'Oops! Something went wrong. Your Rated Movies list is currently empty, or the page you’re looking for couldn’t be found. Please rate a movie to see it here, or try again later. We apologize for any inconvenience.',
      duration: 10,
    })
  }

  useEffect(() => {
    getResponse('return')
  }, [activeTab])

  const debouncedGetResponse = useCallback(
    debounce((value) => getResponse(value), 600),
    []
  )

  const handlePaginationChange = (newPage) => {
    setLoading(true)
    getResponse(searchValue, newPage)
    setCurrentPage(newPage)
  }

  const handleInputChange = (e) => {
    setCurrentPage(1)
    const value = e.target.value
    setSearchValue(value)

    if (value.trim()) {
      setLoading(true)
      error(false)
      debouncedGetResponse(value)
    }
  }

  return (
    <>
      {contextHolder}

      <div className="search">
        {activeTab === 1 && <SearchInput value={searchValue} onChange={handleInputChange} />}
        {loading && <LoadingIndicator />}
        {hasError && <ErrorAlert />}
        {!loading && movies === 0 ? (
          <WarningAlert title="No movies found" subTitle="Please check your input and try some other keywords." />
        ) : !loading ? (
          <Flex
            wrap
            gap={36}
            justify="center"
            style={{ width: 'clamp(800px, 95vw, 1010px)', marginLeft: 'auto', marginRight: 'auto' }}
          >
            {movies}
          </Flex>
        ) : null}
        <Pagination
          className="search__pagination"
          align="center"
          current={currentPage}
          total={totalResultsNum}
          defaultPageSize={20}
          onChange={handlePaginationChange}
        />
      </div>
    </>
  )
}
