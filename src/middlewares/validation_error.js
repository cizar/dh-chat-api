const validationError = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = Object.keys(err.errors).reduce((accum, key) => {
      return { ...accum, [key]: err.errors[key].message }
    }, {})
    return res.status(400).send({
      message: 'Validation error',
      errors
    })
  }
  next(err)
}

export default validationError
