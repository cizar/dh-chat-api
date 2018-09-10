import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import jwt from 'express-jwt'
import { notFound, validationError, errorHandler } from './middlewares'
import routes from './routes'
import config from './config'

const app = express()

app.use(bodyParser.json())
app.use(cors())

const unprotected = [
  { url: '/api/auth', method: 'POST' },
  { url: '/api/users', method: 'POST' }
]

const ensureToken = jwt({
  secret: config.jwt.secret
}).unless({
  path: unprotected, method: ['OPTIONS', 'HEAD']
})

app.use(ensureToken)
app.use('/api', routes)
app.use(notFound)
app.use(validationError)
app.use(errorHandler)

const startServer = () => {
  console.log('Starting server...')
  const server = app.listen(config.port, config.host, () => {
    console.log('Server listening on port %d', server.address().port)
  })
}

const connectDatabase = () => {
  console.log('Connecting to MongoDB...')
  return mongoose.connect(config.mongodb.uri, { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to %s', mongoose.connections[0].host)
    })
}

connectDatabase()
  .then(startServer)
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
