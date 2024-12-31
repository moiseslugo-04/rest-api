import { readJson } from '../../class-3/utils/utils.js'
import { MoviesModels } from '../models/movies.js'
import { validatedPartialMovie, validatedMovie } from '../schema/movie.js'
const movies = readJson('../movies.json')
export class MovieControllers {
  static async getAll(req, res) {
    const { genre } = req.query
    //if there's genre apply the filter
    if (genre) {
      const filterMovies = await MoviesModels.getAll({ genre })
      return res.json(filterMovies)
    }
    //if there's no genre returns movies
    res.status(200).json(movies)
  }
  static async getById(req, res) {
    const { id } = req.params
    //search the movie in the db
    const movie = await MoviesModels.getById({ id })

    //if it's in the db , return the movie
    if (movie) {
      return res.json(movie)
    }
    //if it doesn't exist throw an error
    return res.status(404).json({ message: 'Movie not found' })
  }
  static async create(req, res) {
    //validate the data (req.body)
    const result = validatedMovie(req.body)

    //throws the error
    if (result.error) return res.status(400).json()

    //if there not an error create a new movie
    const newMovie = await MoviesModels.create({ input: result.data })
    res.status(200).json(newMovie)
  }
  static async update(req, res) {
    //💨Very important step:validate data before doing anything
    const result = validatedPartialMovie(req.body)
    //if there any error ,throw the error
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors })
    }
    const { id } = req.params
    const updateMovie = await MoviesModels.update({ id, input: result.data })
    console.log(updateMovie)
    return res.status(200).json(updateMovie)
  }
  static async delete(req, res) {
    const { id } = req.params
    const movieIndex = await MoviesModels.deleted({ id })
    //if the movies was not found send an error message
    if (movieIndex) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    //if the movies was found send a success message
    return res.status(200).json({ message: 'Movie deleted with success' })
  }
}
