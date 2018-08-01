import 'dotenv/config'

export const PORT = process.env.PORT || '8080'

export const HOST = process.env.HOST || '127.0.0.1'

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dh-chat-api'

export const JWT_SECRET = process.env.JWT_SECRET || 'S3cr3t!'

export const JWT_ISSUER = process.env.JWT_ISSUER || 'dh-chat-api'

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'

export const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR || '10'
