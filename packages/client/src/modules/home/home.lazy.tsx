import React from 'react'

export const Home = React.lazy(async () => {
  const module = await import('./home.js')

  return {
    default: module.Home,
  }
})
