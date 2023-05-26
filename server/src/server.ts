import fastify from 'fastify'
import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'
import { uploadRoutes } from './routes/upload'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import jwt from '@fastify/jwt'
import 'dotenv/config'
import { resolve } from 'path'

const app = fastify()

app.register(multipart)
app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadRoutes)
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})
app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'spacetime',
})
app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP Server running on http://localhost:3333')
  })
