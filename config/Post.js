const db = require('./db'),
  { unlink } = require('fs'),
  { promisify } = require('util'),
  root = process.cwd()

const likedOrNot = async (user, post) => {
  let s = await db.query(
    'SELECT COUNT(like_id) AS l FROM likes WHERE like_by=? AND post_id=?',
    [user, post]
  )
  return db.tf(s[0].l)
}

const bookmarkedOrNot = async (user, post) => {
  let s = await db.query(
    'SELECT COUNT(bkmrk_id) AS b FROM bookmarks WHERE bkmrk_by=? AND post_id=?',
    [user, post]
  )
  return db.tf(s[0].b)
}

const isPostMine = async (session, post) => {
  let s = await db.query('SELECT user FROM posts WHERE post_id=?', [post])
  return s[0].user == session ? true : false
}

const didIShare = async (post, session, user) => {
  let s = await db.query(
    'SELECT COUNT(share_id) AS post_share FROM shares WHERE share_by=? AND share_to=? AND post_id=?',
    [session, user, post]
  )
  return db.tf(s[0].post_share)
}

const getCounts = async post_id => {
  let [{ tags_count }] = await db.query(
      'SELECT COUNT(post_tag_id) AS tags_count FROM post_tags WHERE post_id=?',
      [post_id]
    ),
    [{ likes_count }] = await db.query(
      'SELECT COUNT(like_id) AS likes_count FROM likes WHERE post_id=?',
      [post_id]
    ),
    [{ shares_count }] = await db.query(
      'SELECT COUNT(share_id) AS shares_count FROM shares WHERE post_id=?',
      [post_id]
    ),
    [{ comments_count }] = await db.query(
      'SELECT COUNT(comment_id) AS comments_count FROM comments WHERE post_id=?',
      [post_id]
    )

  return {
    tags_count,
    likes_count,
    shares_count,
    comments_count,
  }
}

const deletePost = async ({ post, when }) => {
  await db.query('DELETE FROM likes WHERE post_id=?', [post])
  await db.query('DELETE FROM post_tags WHERE post_id=?', [post])
  await db.query('DELETE FROM shares WHERE post_id=?', [post])
  await db.query('DELETE FROM bookmarks WHERE post_id=?', [post])
  await db.query('DELETE FROM notifications WHERE post_id=?', [post])
  await db.query('DELETE FROM hashtags WHERE post_id=?', [post])

  let [{ imgSrc }] = await db.query(
      'SELECT imgSrc FROM posts WHERE post_id=?',
      [post]
    ),
    comments = await db.query(
      'SELECT commentSrc, type FROM comments WHERE post_id=?',
      [post]
    ),
    deleteFile = promisify(unlink)

  await deleteFile(`${root}/dist/posts/${imgSrc}`)

  comments.map(async c => {
    if (c.type != 'text') {
      await deleteFile(`${root}/dist/comments/${c.commentSrc}`)
    }
  })
  await db.query('DELETE FROM comments WHERE post_id=?', [post])

  if (when == 'user') {
    await db.query('DELETE FROM posts WHERE post_id=?', [post])
  } else {
    await db.query('DELETE FROM posts WHERE post_id=?', [post])
  }
}

module.exports = {
  likedOrNot,
  bookmarkedOrNot,
  isPostMine,
  didIShare,
  getCounts,
  deletePost,
}
