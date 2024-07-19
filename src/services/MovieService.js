import env from 'react-dotenv'

export default class MovieService {
  constructor() {
    this._apiBase = env.API_URL
    this._apiAuthorization = env.API_AUTHORIZATION
    this._apiKey = env.API_KEY
    this._getMethodOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: this._apiAuthorization,
      },
    }
  }

  async _fetchData(url, options) {
    const res = await fetch(url, options)
    if (!res.ok) {
      throw new Error(res.status)
    }
    return await res.json()
  }

  async fetchGenres() {
    const url = `${this._apiBase}/genre/movie/list`
    return await this._fetchData(url, this._getMethodOptions)
  }

  async guestSession() {
    const url = `${this._apiBase}/authentication/guest_session/new`
    return await this._fetchData(url, this._getMethodOptions)
  }

  async searchMovie(input, pageNumber = 1) {
    const url = `${this._apiBase}/search/movie?query=${input.toString()}&page=${pageNumber}`
    return await this._fetchData(url, this._getMethodOptions)
  }

  async addRating(movieID, guestID, rate) {
    const url = `${this._apiBase}/movie/${movieID}/rating?guest_session_id=${guestID}`
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: this._apiAuthorization,
      },
      body: JSON.stringify({ value: rate }),
    }
    await fetch(url, options).catch((err) => console.error(err))
  }

  async searchRatedMovie(pageNumber = 1, guestID) {
    const url = `${this._apiBase}/guest_session/${guestID}/rated/movies?page=${pageNumber}`
    return await this._fetchData(url, this._getMethodOptions)
  }
}
