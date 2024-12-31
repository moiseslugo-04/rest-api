import cors from 'cors'
const defaultOptions = {
  origin: ['http://localhost:3000', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}
export function corsMiddleware({ options = defaultOptions } = {}) {
  return cors(options)
}
