import { lazy } from 'react'

export const PageNotFound = lazy(async () => {
  const module = await import('./page-not-found.js')

  return {
    default: module.PageNotFound,
  }
})
