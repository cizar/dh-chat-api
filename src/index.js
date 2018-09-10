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

const ensureAuth = jwt({
  secret: config.jwt.secret
}).unless({
  method: ['OPTIONS', 'HEAD'],
  path: unprotected
})

app.use(ensureAuth)
app.use('/api', routes)
app.use(notFound)
app.use(validationError)
app.use(errorHandler)

connectDatabase()
  .then(startServer)
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

function connectDatabase () {
  process.stdout.write('Connecting to MongoDB...')
  return mongoose.connect(config.mongodb.uri, { useNewUrlParser: true })
    .then(() => {
      const connection = mongoose.connections[0]
      process.stdout.write(` done (${connection.host})\n`)
    })
}

function startServer () {
  process.stdout.write('Starting server...')
  const server = app.listen(config.port, config.host, () => {
    var address = server.address()
    process.stdout.write(` done (${address.address}:${address.port})\n`)
  })
}
