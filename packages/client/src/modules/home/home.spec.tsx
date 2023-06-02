import { render } from '@testing-library/react'
import { Home } from './home.js'

describe('Home', () => {
  it('should render correctly', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})
