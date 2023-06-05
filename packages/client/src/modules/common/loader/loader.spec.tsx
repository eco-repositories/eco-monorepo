import { render } from '@testing-library/react'
import { Loader } from './loader.js'

describe('Loader', () => {
  it('should render correctly', () => {
    const { container } = render(<Loader />)
    expect(container).toMatchSnapshot()
  })
})
