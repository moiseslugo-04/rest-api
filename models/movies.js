import { readJson } from '../../class-3/utils/utils.js'
const movies = readJson('../movies.json')
import { randomUUID } from 'node:crypto'
export class MoviesModels {
  static async getAll({ genre }) {
    if (genre) {
      const filterMovies = movies.filter((movie) =>
        movie.genre.some(
          (g) => g.toLocaleLowerCase() === genre.toLocaleLowerCase()
        )
      )
      return filterMovies
    }
    return movies
  }
  static async getById({ id = undefined }) {
    const movie = movies.find((movie) => movie.id === id)
    if (movie < 0) return false
    return movie
  }
  static async create({ input }) {
    //TODO: validate the data
    const newMovie = {
      id: randomUUID(),
      ...input,
    }
    movies.push(newMovie)
    return newMovie
  }
  static async update({ id = undefined, input }) {
    const indexMovie = movies.findIndex((movie) => movie.id === id)
    //if there's no in the data bd return false
    if (indexMovie === -1) return false

    // if there not error, update the movie
    const updateMovie = {
      ...movies[indexMovie],
      ...input,
    }
    console.log(input)
    movies[indexMovie] = updateMovie
    return updateMovie
  }
  static async deleted({ id = undefined }) {
    //Looking for the movie to delete
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    //if there's no in the data bd return false
    if (movieIndex === -1) return false

    //update the db,  if the movie to delete is found
    movies.splice(movieIndex, 1)

    //if it's in the db ,return the index
    return movieIndex
  }
}
