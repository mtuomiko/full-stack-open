import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

describe('SimpleBlog component', () => {
  let component

  const blog = {
    title: 'Zen and maintenance',
    author: 'Some Wise Guy',
    likes: '66',
  }

  const mockFunction = jest.fn()

  beforeEach(() => {
    component = render(
      <SimpleBlog
        blog={blog}
        onClick={mockFunction}
      />
    )
  })

  test('Renders content', () => {
    const headerDiv = component.container.querySelector('.headerDiv')
    expect(headerDiv).toHaveTextContent('Zen and maintenance Some Wise Guy')

    const contentDiv = component.container.querySelector('.contentDiv')
    expect(contentDiv).toHaveTextContent('blog has 66 likes')

    const blogDiv = component.container.querySelector('.blogDiv')

    console.log(prettyDOM(blogDiv))
  })

  test('Two like button click results in two function calls', () => {
    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockFunction.mock.calls.length).toBe(2)
  })
})