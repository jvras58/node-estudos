require('dotenv').config()
import {OpenAI, ClientOptions} from 'openai'
const {OPENAI_API_KEY} = process.env

//FIXME: error 500 com a openai
export const openai = new OpenAI(OPENAI_API_KEY as ClientOptions)
