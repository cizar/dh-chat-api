export default (err, req, res, next) => {
  console.dir(err)
  const error = err.message || err || 'Error'
  res.status(err.status || 500)
  if (req.accepts('json')) {
    return res.json({ error })
  }
  res.send(error)
}
