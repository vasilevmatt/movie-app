import { createContext, useEffect, useState } from 'react'
import MovieService from '../services/MovieService'

const AppContext = createContext({
  genres: [],
  areGenresLoading: false,
})

export function AppContextProvider({ children }) {
  const [genres, setGenres] = useState([])
  const [areGenresLoading, setAreGenresLoading] = useState(true)
  const [guestSession, setGuestSession] = useState('')
  const [hasError, setHasError] = useState(false)
  const [activeTab, setActiveTab] = useState(1)

  const movieService = new MovieService()
  const getGenres = async () => {
    try {
      const res = await movieService.fetchGenres()
      setGenres(res.genres)
      setAreGenresLoading(false)
    } catch (e) {
      setHasError(true)
    }
  }
  const getSession = async () => {
    try {
      const res = await movieService.guestSession()
      setGuestSession(res.guest_session_id)
    } catch (e) {
      setHasError(true)
    }
  }

  useEffect(() => {
    getSession()
    getGenres()
  }, [])

  const error = (bool) => {
    setHasError(bool)
  }

  return (
    <AppContext.Provider value={{ genres, areGenresLoading, hasError, error, setActiveTab, activeTab, guestSession }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
