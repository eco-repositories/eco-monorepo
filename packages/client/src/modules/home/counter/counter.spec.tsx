import { render, fireEvent } from '@testing-library/react'
import { Counter } from './counter.tsx'

describe('Counter', () => {
  it('should render correctly', () => {
    const { container } = render(<Counter />)
    expect(container).toMatchSnapshot()
  })

  it('should increment the count on button click', () => {
    const { container, getByText } = render(<Counter />)
    const incrementButton = getByText('Increment') as HTMLButtonElement

    fireEvent.click(incrementButton)

    expect(container).toMatchSnapshot()
  })
})
