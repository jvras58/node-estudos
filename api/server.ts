import Fastify from 'fastify'
import { prisma } from './lib/prisma'

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
  return { message: 'welcome to API' }
})

app.get('/prompts', async () => {
  const prompts = await prisma.prompt.findMany()
  return prompts
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

