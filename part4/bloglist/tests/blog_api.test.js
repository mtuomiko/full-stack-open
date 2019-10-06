const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.testBlogs.map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('Get all blogs', () => {
  test('Returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.testBlogs.length)
  })

  test('Blogs have property id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST blog', () => {
  test('Blog count increases and new blog is found', async () => {
    const newBlog = {
      title: 'Test blog',
      author: 'Testeri Teemu',
      url: 'http://teemunb.log/main.html',
      likes: 66,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.testBlogs.length + 1)

    const noIdBlogs = blogsAtEnd.map(blog => ({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    }))
    expect(noIdBlogs).toContainEqual(newBlog)
  })

  test('New blog without likes property defaults to zero likes', async () => {
    const newBlog = {
      title: 'Test blog',
      author: 'Testeri Teemu',
      url: 'http://teemunb.log/main.html',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // Could also get response from post and verify number of likes from that

    const blogsAtEnd = await helper.blogsInDb()

    const savedBlog = blogsAtEnd.filter(blog => blog.title === 'Test blog')[0]

    expect(savedBlog.likes).toBe(0)
  })

  test('New blog without title and url fails', async () => {
    const newBlog = {
      author: 'Testeri Teemu',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.testBlogs.length)
  })

})

describe('DELETE blog', () => {
  test('Blog delete returns correct and deleted blog can\'t be found', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const idToDelete = blogsAtStart[0].id
    await api
      .delete(`/api/blogs/${idToDelete}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const blogIds = blogsAtEnd.map(blog => blog.id)
    expect(blogIds).not.toContain(idToDelete)
  })
})

describe('Update blog', () => {
  test('Blog update returns updated blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const blog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(200)

    const returnedBlog = response.body

    expect(returnedBlog.likes).toBe(blogToUpdate.likes + 1)
  })

  test('Blog update updates blog data', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const blog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.filter(blog => blog.id === blogToUpdate.id)[0]
    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})