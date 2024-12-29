const z = require('zod')
const movieSchema = z.object({
  title: z.string({
    required_error: 'Movie title is required',
    invalid_type_error: 'Movie title must be a string',
  }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: 'Poster must be a valid URL',
  }),
  rate: z.number().min(0).max(10).default(4),
  genre: z.array(
    z.enum([
      'Action',
      'Terror',
      'Drama',
      'Crime',
      'Adventure',
      'Sci-Fi',
      'Romance',
      'Biography',
    ]),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre',
    }
  ),
})
function validatedMovie(data) {
  return movieSchema.safeParse(data)
}
function validatedPartialMovie(shape) {
  return movieSchema.partial().safeParse(shape)
}
module.exports = { validatedMovie, validatedPartialMovie }
