const userR = require('./user/user-routes'),
  signUpR = require('./user/signup-routes'),
  loginR = require('./user/login-routes'),
  pswrdR = require('./user/password-routes'),
  qlR = require('./user/quick-login-routes')

const postR = require('./api/post/post-routes'),
  getPostR = require('./api/post/get-posts'),
  commentR = require('./api/post/comment-routes'),
  shareR = require('./api/post/share-routes'),
  likesR = require('./api/post/likes-routes')

const followR = require('./api/follow/follow-routes'),
  favR = require('./api/follow/favourite-routes'),
  recommendR = require('./api/follow/recommend-routes')

const conR = require('./api/conversation/con-routes'),
  mssgR = require('./api/conversation/message-routes')

const groupR = require('./api/group/group-routes'),
  groupSections = require('./api/group/get-group-sections')

const notifyR = require('./api/others/notification-routes'),
  editR = require('./api/others/edit-routes'),
  exploreR = require('./api/others/explore-routes'),
  avatarR = require('./api/avatar-routes'),
  settingsR = require('./api/others/settings-routes'),
  hashtagR = require('./api/others/hashtag-routes'),
  adminR = require('./api/others/admin-routes'),
  apiR = require('./api/api-routes')

const mainR = require('./main-routes')

const AppRoutes = app => {
  app.use('/', userR)
  app.use('/', signUpR)
  app.use('/', loginR)
  app.use('/', pswrdR)
  app.use('/api', qlR)

  app.use('/api', followR)
  app.use('/api', recommendR)
  app.use('/api', favR)

  app.use('/api', postR)
  app.use('/api', getPostR)
  app.use('/api', commentR)
  app.use('/api', shareR)
  app.use('/api', likesR)

  app.use('/api', groupR)
  app.use('/api', groupSections)

  app.use('/api', conR)
  app.use('/api', mssgR)

  app.use('/api', avatarR)
  app.use('/api', notifyR)
  app.use('/api', editR)
  app.use('/api', exploreR)
  app.use('/api', settingsR)
  app.use('/api', hashtagR)
  app.use('/api', adminR)
  app.use('/api', apiR)

  app.use('/', mainR)
}

module.exports = AppRoutes
