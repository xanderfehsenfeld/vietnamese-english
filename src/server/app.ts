'use strict'
import * as express from 'express'

import { Datastore } from '@google-cloud/datastore'

import * as session from 'express-session'
import * as passport from 'passport'
import * as bodyParser from 'body-parser'

import {
  oauth2Routes,
  config,
  redirectToLoginIfUnauthorized,
  authRequired,
} from './auth'

const DatastoreStore = require('@google-cloud/connect-datastore')(session)

const app = express()

const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: config['OAUTH2_CLIENT_SECRET'],
  signed: true,
  store: new DatastoreStore({
    dataset: new Datastore({ kind: 'express-sessions' }),
  }),
}

app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(oauth2Routes)

const datastore = new Datastore({
  projectId: 'partner-credit-console-rebuild',
})
app.get('/state', authRequired, async (req, res) => {
  const query = datastore.createQuery('state')
  const state = (await datastore.runQuery(query))[0]
  res
    .status(200)
    .send(state)
    .end()
})

app.post('/state', authRequired, async (req, res) => {
  await datastore.upsert({
    key: datastore.key(['state', req.user.id]),
    data: JSON.stringify(req.body),
  })
  res
    .status(201)
    .send('201')
    .end()
})

app.use('/', redirectToLoginIfUnauthorized, express.static('build/client'))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
