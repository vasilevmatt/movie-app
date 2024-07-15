import { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import MovieService from '../../services/MovieService'
import { Alert, Button, Flex, Pagination, Result, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import MovieCard from '../MovieCard/MovieCard'
import './index.scss'

export default function Search() {
  const [searchValue, setSearchValue] = useState('return')
  const [movies, setMovies] = useState([])
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResultsNum, setTotalResultsNum] = useState(0)

  const movieService = new MovieService()
  const getResponse = async (value, pageNumber) => {
    try {
      const res = await movieService.searchMovie(value, pageNumber)
      setTotalResultsNum(res.total_results)
      setMovies(res)

      if (res) {
        if (res.total_results === 0) {
          setLoading(false)
          setMovies(0)
        } else {
          const movieList = res.results.map((item) => {
            return <MovieCard {...item} key={item.id} />
          })
          setMovies(movieList)
          setLoading(false)
        }
      }
    } catch (e) {
      setLoading(false)
      setHasError(true)
      setMovies([])
    }
  }

  useEffect(() => {
    getResponse('return')
  }, [])

  const debouncedGetResponce = useCallback(
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
      debouncedGetResponce(value)
    }
  }

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
      />

      {loading && (
        <Spin
          className="search__loading"
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 48,
              }}
              spin
            />
          }
        />
      )}
      {hasError && (
        <Alert
          className="search__error"
          message="Karma is my Error"
          description="Something went wrong. Try later (or not?)"
          type="error"
          showIcon
          style={{ marginLeft: 'auto', marginRight: 'auto' }}
        />
      )}
      {!loading && movies === 0 ? (
        <Result
          className="search__warning"
          status="warning"
          title="No movies found"
          subTitle="Please check your input and try some other keywords."
          extra={[
            <Button type="primary" key="console">
              Go Home
            </Button>,
            <Button key="buy">Try Again</Button>,
          ]}
        />
      ) : !loading ? (
        <Flex
          wrap
          gap={36}
          justify="center"
          style={{ width: 'clamp(800px, 95vw,1010px)', marginLeft: 'auto', marginRight: 'auto' }}
        >
          {movies}
          <Pagination
            className="search__pagination"
            align="center"
            current={currentPage}
            total={totalResultsNum}
            defaultPageSize={20}
            onChange={(page) => handlePaginationChange(page)}
          />
        </Flex>
      ) : null}
    </div>
  )
}
