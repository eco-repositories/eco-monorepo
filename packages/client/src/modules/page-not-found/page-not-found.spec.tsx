import { render } from '@testing-library/react'
import type * as Router from 'react-router-dom'
import { PageNotFound } from './page-not-found.js'

vitest.mock('react-router-dom', async () => {
  const router: typeof Router = await vitest.importActual('react-router-dom')

  return {
    ...router,
    useLocation: () => ({
      pathname: '/mock/pathname',
    }),
  }
})

describe(PageNotFound.name, () => {
  it('should render correctly', () => {
    const { container } = render(<PageNotFound />)
    expect(container).toMatchSnapshot()
  })
})
