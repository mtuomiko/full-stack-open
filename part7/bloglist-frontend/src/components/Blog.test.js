import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('Blog component', () => {
  let component

  const blog = {
    title: 'Zen and maintenance',
    author: 'Some Wise Guy',
    url: 'http://zen.and.maintenan.ce/blawg',
    likes: '66',
    user: {
      name: 'Philosopher Phil',
      username: 'philphil',
    }
  }

  const user = {
    username: 'philphil'
  }

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
      />
    )
  })

  test('Renders only simple view content at first', () => {
    const blogDiv = component.container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent('Zen and maintenance, Some Wise Guy')

    expect(blogDiv).not.toHaveTextContent('http://zen.and.maintenan.ce/blawg')
    expect(blogDiv).not.toHaveTextContent('66 likes')
    expect(blogDiv).not.toHaveTextContent('Added by Philosopher Phil')

    console.log(prettyDOM(blogDiv))
  })

  test('Renders detailed view after click', () => {
    const blogDiv = component.container.querySelector('.blog')

    fireEvent.click(blogDiv)

    expect(blogDiv).toHaveTextContent('Zen and maintenance, Some Wise Guy')
    expect(blogDiv).toHaveTextContent('http://zen.and.maintenan.ce/blawg')
    expect(blogDiv).toHaveTextContent('66 likes')
    expect(blogDiv).toHaveTextContent('Added by Philosopher Phil')

    console.log(prettyDOM(blogDiv))
  })

})