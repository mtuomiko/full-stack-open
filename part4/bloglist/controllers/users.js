const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(user => user.toJSON()))
})

usersRouter.post('', async (request, response) => {
  try {
    const body = request.body

    if (!body.password || body.password.length < 3) {
      return response.status(400).send({ error: 'password invalid, must be at least 3 chars long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)

  } catch (exception) {
    console.log(exception)
  }
})

module.exports = usersRouter