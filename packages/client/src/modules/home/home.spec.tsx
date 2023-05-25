import { render } from '@testing-library/react'
import { Home } from './home.tsx'

describe('Home', () => {
  it('should render correctly', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})
