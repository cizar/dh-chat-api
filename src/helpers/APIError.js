import httpStatus from 'http-status'

function APIError (message, status) {
  this.message = message
  this.status = status
}

export default APIError
