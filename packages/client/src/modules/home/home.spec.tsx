import { render } from '@testing-library/react'
import { Home } from './home.js'

vitest.mock('./api-tester/api-tester.js', () => ({
  ApiTester: () => <div className='ApiTester'/>,
}))

vitest.mock('./counter/counter.js', () => ({
  Counter: () => <div className='Counter'/>,
}))

describe('Home', () => {
  it('should render correctly', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})
