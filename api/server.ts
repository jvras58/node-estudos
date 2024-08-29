import Fastify from 'fastify'

const isProduction = process.env.NODE_ENV === 'production'

// documentação: https://fastify.dev/docs/latest/Reference/Logging/#enable-logging

const app = Fastify({
  logger: isProduction
    ? true
    : {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss.l',
            ignore: 'pid,hostname', 
          },
        },
      }
})

app.get('/', async () => {
  return { hello: 'world' }
})

;(async () => {
  try {
    await app.listen({ port: 3333 })
    app.log.info('Server running at http://localhost:3333/')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
})()

