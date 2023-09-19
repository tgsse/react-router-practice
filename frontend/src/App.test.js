import {render, screen} from '@testing-library/react'
import App from './App'

test('renders Home Page', () => {
    render(<App />)
    const homePageEl = screen.getByText('Home Page')
    expect(homePageEl).toBeVisible()
})
