import express from 'express'
import { corsMiddleware } from './middleware/corsMiddleware.js'
import { moviesRouter } from './routes/movies.js'
const app = express()

app.use(express.json()) // to be able to receive the json in the body
app.use(corsMiddleware()) // this fixes the cors issue

app.use('/movies', moviesRouter)
const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
