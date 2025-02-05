import { lazy } from 'react'

export const Home = lazy(async () => {
  const module = await import('./home.js')

  return {
    default: module.Home,
  }
})
