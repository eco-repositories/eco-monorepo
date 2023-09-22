import axios from 'axios'

/** @private */
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL

/*
  FIXME: add centralized approach to error handling
  Can't use `client = new Axios({ … })` for that, it
  is significantly different from `axios.create({ … })`
 */
export const client = axios.create({
  baseURL: SERVER_BASE_URL,
})
