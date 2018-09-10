import 'dotenv/config'
import convict from 'convict'

const config = convict({
  env: {
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  host: {
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'HOST',
    arg: 'host'
  },
  port: {
    format: 'port',
    default: 8080,
    env: 'PORT',
    arg: 'port'
  },
  bcrypt: {
    saltRounds: {
      format: 'nat',
      default: 10,
      env: 'BCRYPT_SALT_ROUNDS',
      arg: 'rounds'
    },
  },
  mongodb: {
    uri: {
      format: 'url',
      default: 'mongodb://127.0.0.1:27017/dh-chat-api',
      env: 'MONGODB_URI',
      arg: 'db'
    }
  },
  jwt: {
    secret: {
      format: String,
      default: 'S3cr3t!',
      env: 'JWT_SECRET',
      arg: 'secret'
    },
    issuer: {
      format: String,
      default: 'dh-chat-api',
      env: 'JWT_ISSUER',
      arg: 'iss'
    },
    expiresIn: {
      format: String,
      default: '1h',
      env: 'JWT_EXPIRES_IN',
      arg: 'exp'
    }
  }
})

export default config.get()
