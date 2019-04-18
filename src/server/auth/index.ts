'use strict'

import { Router } from 'express'
import * as passport from 'passport'

import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { RequestHandler } from 'express-serve-static-core'
export const config = {
  OAUTH2_CLIENT_ID:
    '1004674224733-cqe9hn4kie1l1vl8lf64853taclcnj6r.apps.googleusercontent.com',
  OAUTH2_CLIENT_SECRET: 'z321eH_rmsOyR0Bb9GSnAlCc',
  OAUTH2_CALLBACK: '/auth/google/callback',
}

const extractProfile = (profile: any) => {
  let imageUrl = ''
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value
  }
  return {
    id: profile.id,
    displayName: profile.displayName,
    image: imageUrl,
  }
}

passport.use(
  new GoogleStrategy(
    {
      clientID: config['OAUTH2_CLIENT_ID'],
      clientSecret: config['OAUTH2_CLIENT_SECRET'],
      callbackURL: config['OAUTH2_CALLBACK'],
    },
    (
      _accessToken: string,
      _refreshToken: string,
      profile: any,
      done: Function,
    ) => {
      done(null, extractProfile(profile))
    },
  ),
)

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})

const oauth2Routes = Router()

export const redirectToLoginIfUnauthorized: RequestHandler = (
  req,
  res,
  next,
) => {
  if (!req.user && req.session) {
    req.session.oauth2return = req.originalUrl
    return res.redirect('/auth/login')
  }
  next()
}

export const authRequired: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .send('401 NOT AUTHORIZED')
      .end()
  }
  next()
}

oauth2Routes.get(
  '/auth/login',

  (req, res, next) => {
    if (req.query.return && req.session) {
      req.session.oauth2return = req.query.return
    }
    next()
  },

  passport.authenticate('google', { scope: ['email', 'profile'] }),
)

oauth2Routes.get(
  '/auth/google/callback',

  passport.authenticate('google'),

  (req, res) => {
    if (req.session) {
      const redirect = req.session.oauth2return || '/'
      delete req.session.oauth2return
      res.redirect(redirect)
    }
  },
)

oauth2Routes.get('/auth/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

export { oauth2Routes }
