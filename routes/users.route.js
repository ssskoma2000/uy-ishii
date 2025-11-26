const express = require('express')
const { postUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/users.controller.js')

const route = express.Router()

route.post('/users', postUser)
route.get('/users', getUsers)
route.get('/users/:id', getUserById)
route.put('/users/:id', updateUser)
route.delete('/users/:id', deleteUser)

module.exports = route