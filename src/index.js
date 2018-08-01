import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import jwt from 'express-jwt'
import {
  handleNotFound,
  handleValidationError,
  handleError
} from './middlewares'
import routes from './routes'
import {
  PORT,
  HOST,
  MONGODB_URI,
  JWT_SECRET
} from './config'

const app = express()

app.use(bodyParser.json())
app.use(cors())

const unprotected = [
  { url: '/api/auth', method: 'POST' },
  { url: '/api/users', method: 'POST' }
]

app.use(
  jwt({ secret: JWT_SECRET })
    .unless({ path: unprotected })
)

app.use('/api', routes)

app.use(handleNotFound)
app.use(handleValidationError)
app.use(handleError)


const startServer = () => {
  const server = app.listen(PORT, HOST, () => {
    console.log('Server listening on port %d', server.address().port)
  })
}

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(startServer)
  .catch(err=> {
    console.error(err)
    process.exit(1)
  })
