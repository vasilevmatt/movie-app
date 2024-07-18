export default class MovieService {
  constructor() {
    this._apiBase = 'https://api.themoviedb.org/3'
    this._apiAuthorization =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGYzZDg2YTIwM2QxNjkyZDQ5OGU0OTk5MDBhZjVkZiIsIm5iZiI6MTcyMDcxOTk0NC4zMjQ4MTksInN1YiI6IjY2OTAxOGE4NGQxZWRiODRjOWIzYTE4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x9Pb0CguU0M-aasuLe_HXHx-_cM1zAmzim7hyUi6ryU'
    this._apiKey = 'd4f3d86a203d1692d498e499900af5df'
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
