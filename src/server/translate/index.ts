import { Router } from 'express'
import { v3beta1 } from '@google-cloud/translate'
import { Datastore } from '@google-cloud/datastore'
import { pick } from 'lodash'
import { authRequired } from '../auth'
import { Translation } from '../../model'

const { TranslationServiceClient } = v3beta1

const translationClient = new TranslationServiceClient()

const projectId = 'vietnamese-english'
const location = 'global'

const datastore = new Datastore({
  projectId,
})

interface GoogleTranslation {
  translatedText: string
  model: string
  glossaryConfig?: any
  detectedLanguageCode: string
}

interface GoogleTranslateResponse {
  translations: GoogleTranslation[]
  glossaryTranslations: any[]
}

const fetchTranslationsFromGoogle = async (
  textsToTranslate: string[],
): Promise<Translation[]> => {
  const request = {
    parent: translationClient.locationPath(projectId, location),
    contents: textsToTranslate,
    mimeType: 'text/plain', // mime types: text/plain, text/html
    targetLanguageCode: 'en-US',
    sourceLanguageCode: 'vi',
  }

  const response: GoogleTranslateResponse = (await translationClient.translateText(
    request,
  ))[0]
  return response.translations.map(({ translatedText }, i) => ({
    english: translatedText,
    vietnamese: textsToTranslate[i],
  }))
}

const datastoreKey = 'translation'
const saveTranslationsToDatastore = async (translations: Translation[]) => {
  const entities = translations.map(({ english, vietnamese }) => ({
    key: datastore.key([datastoreKey, vietnamese]),
    data: { english, vietnamese },
  }))

  datastore.upsert(entities)
}

const fetchTranslationsFromDatastore = async (translations: string[]) => {
  const query = datastore.createQuery(datastoreKey)
  const results: Translation[] = (await datastore.runQuery(query))[0]
  return results
    .filter(({ vietnamese }) => translations.some((v) => v === vietnamese))
    .map((v) => pick(v, ['english', 'vietnamese']))
}

const translateText = async (
  textsToTranslate: string[],
): Promise<(Translation | undefined)[]> => {
  const savedTranslations: Translation[] = await fetchTranslationsFromDatastore(
    textsToTranslate,
  )

  const notYetSavedTranslations: string[] = textsToTranslate.filter(
    (v) => !savedTranslations.some(({ vietnamese }) => vietnamese === v),
  )

  const translationsFromGoogle = notYetSavedTranslations.length
    ? await fetchTranslationsFromGoogle(notYetSavedTranslations)
    : []

  if (translationsFromGoogle.length) {
    await saveTranslationsToDatastore(translationsFromGoogle)
  }

  const allTranslations: Translation[] = [
    ...savedTranslations,
    ...translationsFromGoogle,
  ]

  return textsToTranslate.map((vietnameseToTranslate) => {
    const translation = allTranslations.find(
      ({ vietnamese }) => vietnamese === vietnameseToTranslate,
    )
    return translation
      ? translation
      : { english: '', vietnamese: vietnameseToTranslate }
  })
}

const router = Router()

router.get('/translation', authRequired, async (req, res) => {
  let textToTranslate = req.query.q
  if (!Array.isArray(textToTranslate)) {
    textToTranslate = [textToTranslate]
  }
  if (textToTranslate) {
    const response = await translateText(textToTranslate)
    res
      .status(200)
      .send(response)
      .end()
  } else {
    res
      .status(400)
      .send('BAD REQUEST')
      .end()
  }
})

export default router
