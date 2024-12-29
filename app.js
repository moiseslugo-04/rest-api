const express = require('express')
const app = express()
const crypto = require('crypto')
const cors = require('cors')
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)
//Data:movie
const movies = require('./movies.json')
const { validatedMovie, validatedPartialMovie } = require('./schema/movie')
const ACCESS_ORIGINS = app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filterMovie = movies.filter((movie) =>
      movie.genre.some(
        (g) => g.toLocaleLowerCase() === genre.toLocaleLowerCase()
      )
    )
    return res.json(filterMovie)
  }
  res.status(200).json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  return res.json(movie)
})
app.post('/movies', (req, res) => {
  const result = validatedMovie(req.body)
  if (result.error) {
    return res.status(400).json()
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  }
  res.status(200).json(newMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1) {
    console.log(movieIndex)
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.status(200).json({ message: 'Movie deleted with success' })
})

app.patch('/movies/:id', (req, res) => {
  //💨Very important step:validate data before doing anything
  const result = validatedPartialMovie(req.body)

  //if there any error ,throw the error
  if (!result.success) {
    return res.status(400).json({ message: result.error.errors })
  }

  const { id } = req.params
  const indexMovie = movies.findIndex((movie) => movie.id === id)

  if (indexMovie === -1) {
    return res.status(404).json({ message: 'Movie not found ' })
  }

  // if there not error, update the movie
  const updateMovie = {
    ...movies[indexMovie],
    ...result.data,
  }
  movies[indexMovie] = updateMovie
  return res.status(200).json(result.data)
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
