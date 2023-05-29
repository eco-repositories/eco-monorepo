import axios from 'axios'

/** @private */
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL

export const client = axios.create({
  baseURL: SERVER_BASE_URL,
})
