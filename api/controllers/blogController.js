const mongoose = require('mongoose')
const Blog = require('../models/blog')

exports.all_blogs = (req, res) => {
  Blog.find({})
    .then(blogs => {
      if (blogs.length > 0) res.json(blogs)
      else res.json({ error: 'have no any blogs' })
    })
    .catch(err => res.send(err))
}

exports.new_blog = (req, res) => {
  new Blog(req.body)
    .save()
    .then(blog => res.json(blog))
    .catch(err => res.send(err))
}

exports.one_blog = (req, res) => {
  Blog.findById(req.params.blogId)
    .then(blog => res.json(blog))
    .catch(err => res.send(err))
}
