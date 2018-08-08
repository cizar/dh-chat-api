const errorHandler = (err, req, res, next) => {
  const message = err.message || err || 'Error'
  res.status(err.status || 500)
  if (req.accepts('json')) {
    return res.json({
      message
    })
  }
  res.send(message)
}

export default errorHandler
