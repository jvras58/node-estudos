require('dotenv').config()
import {OpenAI} from 'openai'
const {API_KEY} = process.env

export const openai = new OpenAI({
    apiKey: API_KEY,
    
})
