'use strict'
import * as express from 'express'
import { words, definitions } from '@vntk/dictionary'

const app = express()

app.get('/dictionary', async (req, res, next) => {
  res
    .status(200)
    .send(definitions)
    .end()
})

app.use('/', express.static('build/client'))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
