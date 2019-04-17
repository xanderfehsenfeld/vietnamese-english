import { Router } from 'express'
import axios from 'axios'

import * as key from './key.json'

const translate = async (textToTranslate: string) => {
  let url = 'https://www.googleapis.com/language/translate/v2/'
  url += '?key=' + key.apiKey

  url += '&q=' + encodeURI(textToTranslate)

  url += '&target=' + 'en'
  url += '&source=' + 'vi'

  return await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
}

const router = Router()

router.get('/translation', async (req, res) => {
  console.log(key)
  const textToTranslate = req.query.q
  if (textToTranslate) {
    const response = await translate('An Bình B')

    console.log(response.data.data.translations)

    res
      .status(200)
      .send(response.data.data.translations)
      .end()
  } else {
    res
      .status(400)
      .send('BAD REQUEST')
      .end()
  }
})

export default router
