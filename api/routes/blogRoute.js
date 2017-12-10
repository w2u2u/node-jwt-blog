module.exports = app => {
  const blog = require('../controllers/blogController')

  app
    .route('/blogs')
    .get(blog.all_blogs)
    .post(blog.new_blog)

  app.route('/blogs/:blogId').get(blog.one_blog)
}
