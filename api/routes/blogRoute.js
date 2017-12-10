module.exports = app => {
  const passport = require('passport')
  const blog = require('../controllers/blogController')

  app
    .route('/blogs')
    .get(blog.all_blogs)
    .post(passport.authenticate('jwt', { session: false }), blog.new_blog)

  app.route('/blogs/:blogId').get(blog.one_blog)
}
