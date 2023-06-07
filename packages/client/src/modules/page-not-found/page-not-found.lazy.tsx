import React from 'react'

export const PageNotFound = React.lazy(async () => {
  const module = await import('./page-not-found.js')

  return {
    default: module.PageNotFound,
  }
})
