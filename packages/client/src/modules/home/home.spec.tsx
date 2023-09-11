import { render } from '@testing-library/react'
import { Home } from './home.js'

vitest.mock('./health/health.js', async () => ({
  Health: () => <div className='Health' />,
}))

describe(Home.name, () => {
  it('should render correctly', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})
