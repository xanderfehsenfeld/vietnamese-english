import { Translate } from '@google-cloud/translate'
import { Router } from 'express'

const translate = new Translate()

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const text = 'bên bị'
const target = 'vi'
const model = 'The model to use, e.g. nmt'

const options = {
  // The target language, e.g. "ru"
  to: target,
  // Make sure your project is whitelisted.
  // Possible values are "base" and "nmt"
  model: model,
}

// Translates the text into the target language. "text" can be a string for
// translating a single piece of text, or an array of strings for translating
// multiple texts.

const router = Router()

router.get('/translation', async (req, res) => {
  let [translations] = await translate.translate(text, options)
  const translationsArray = Array.isArray(translations)
    ? translations
    : [translations]

  console.log('Translations:')
  translationsArray.forEach((translation, i) => {
    console.log(`${text[i]} => (${target}) ${translation}`)
  })
})

export default router
