import { NotFound } from 'http-errors'

const notFound = (req, res, next) =>
  next(NotFound())

export default notFound
