import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('App component', () => {
  test('If no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )

    await waitForElement(
      () => component.getByText('Login')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)

    expect(component.container).not.toHaveTextContent(
      'React patterns'
    )
    expect(component.container).not.toHaveTextContent(
      'Go To Statement Considered Harmful'
    )
    expect(component.container).not.toHaveTextContent(
      'Canonical string reduction'
    )
    expect(component.container).not.toHaveTextContent(
      'First class tests'
    )
    expect(component.container).not.toHaveTextContent(
      'TDD harms architecture'
    )
    expect(component.container).not.toHaveTextContent(
      'Type wars'
    )

  })

  test('If user logged in, blogs are visible', async () => {
    const user = {
      username: 'teemutest',
      token: 'randomString',
      name: 'Teemu Testeri',
    }

    localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    await waitForElement(
      () => component.getByText('Blogs')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(6)

    expect(component.container).toHaveTextContent(
      'React patterns'
    )
    expect(component.container).toHaveTextContent(
      'Go To Statement Considered Harmful'
    )
    expect(component.container).toHaveTextContent(
      'Canonical string reduction'
    )
    expect(component.container).toHaveTextContent(
      'First class tests'
    )
    expect(component.container).toHaveTextContent(
      'TDD harms architecture'
    )
    expect(component.container).toHaveTextContent(
      'Type wars'
    )
  })

})