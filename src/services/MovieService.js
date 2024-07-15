export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3'
  _apiAuthorization =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGYzZDg2YTIwM2QxNjkyZDQ5OGU0OTk5MDBhZjVkZiIsIm5iZiI6MTcyMDcxOTk0NC4zMjQ4MTksInN1YiI6IjY2OTAxOGE4NGQxZWRiODRjOWIzYTE4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x9Pb0CguU0M-aasuLe_HXHx-_cM1zAmzim7hyUi6ryU'

  async searchMovie(input, pageNumber = 1) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: this._apiAuthorization,
      },
    }
    const res = await fetch(`${this._apiBase}/search/movie?query=${input.toString()}&page=${pageNumber}`, options)

    if (!res.ok) {
      throw new Error(`Could not fetch ${input}, received ${res.status}`)
    }
    return await res.json()
  }
}
