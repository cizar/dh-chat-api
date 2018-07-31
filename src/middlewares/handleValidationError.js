export default (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({
      errors: Object.keys(err.errors).reduce((accum, key) => {
        return {
          ...accum,
          [key]: err.errors[key].message
        }
      }, {})
    })
  }
  next(err)
}
