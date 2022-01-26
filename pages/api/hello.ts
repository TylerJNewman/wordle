// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import axios, {AxiosRequestConfig} from 'axios'

const options: AxiosRequestConfig<any> = {
  method: 'GET',
  url: 'https://wordsapiv1.p.rapidapi.com/words/hatchback/typeOf',
  headers: {
    'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
    'x-rapidapi-key': '1091ffc0bemsh535785209084c1ap199b45jsnbe5308f6b1fe',
  },
}

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const {data} = await axios.request(options)
    const {word} = data
    res.status(200).json({word})
  } catch (error) {
    console.error(error)
    res.status(500).end(error)
  }
}
