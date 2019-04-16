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
import { values } from 'lodash'
import translateRoutes from './translate'

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
app.use(translateRoutes)

const datastore = new Datastore({
  projectId: 'vietnamese-english',
})
app.get('/state', authRequired, async (req, res) => {
  const query = datastore
    .createQuery('state')
    .filter('__key__', '=', datastore.key(['state', req.user.id]))
  const state = JSON.parse(
    values((await datastore.runQuery(query))[0][0]).join(''),
  )
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

app.get('/user', authRequired, (req, res) => {
  res
    .status(200)
    .send(req.user)
    .end()
})
app.use(
  '/',
  redirectToLoginIfUnauthorized,
  express.static(
    `${
      process.env.NODE_ENV === 'production' ? 'dist-prod' : 'dist-dev'
    }/client`,
  ),
)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
