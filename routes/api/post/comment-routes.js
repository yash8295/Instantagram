const app = require('express').Router(),
  db = require('../../../config/db'),
  User = require('../../../config/User'),
  root = process.cwd(),
  upload = require('multer')({
    dest: `${root}/dist/temp/`,
  }),
  { ProcessImage, DeleteAllOfFolder } = require('handy-image-processor'),
  { unlinkSync, createReadStream, createWriteStream } = require('fs')

app.post('/comment-text', async (req, res) => {
  try {
    let { post_id, text } = req.body,
      { id } = req.session,
      comment = {
        type: 'text',
        text,
        comment_by: id,
        post_id,
        comment_time: new Date().getTime(),
      },
      { insertId } = await db.query('INSERT INTO comments SET ?', comment)
    await User.mentionUsers(text, id, post_id, 'comment')

    res.json({
      success: true,
      mssg: 'Commented!!',
      comment_id: insertId,
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

app.post('/comment-image', upload.single('commentImage'), async (req, res) => {
  try {
    let { id } = req.session,
      { post } = req.body,
      filename = `instagram_comment_${new Date().getTime()}.jpg`,
      obj = {
        srcFile: req.file.path,
        destFile: `${root}/dist/comments/${filename}`,
      },
      insert = {
        type: 'image',
        commentSrc: filename,
        comment_by: id,
        post_id: post,
        comment_time: new Date().getTime(),
      }

    await ProcessImage(obj)
    DeleteAllOfFolder(`${root}/dist/temp/`)

    let { insertId } = await db.query('INSERT INTO comments SET ?', insert)

    res.json({
      success: true,
      mssg: 'Commented!!',
      comment_id: insertId,
      filename,
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

app.post('/comment-sticker', async (req, res) => {
  try {
    let { sticker, post } = req.body,
      { id } = req.session,
      filename = `instagram_comment_${new Date().getTime()}.jpg`,
      comment = {
        type: 'sticker',
        commentSrc: filename,
        comment_by: id,
        post_id: post,
        comment_time: new Date().getTime(),
      }

    await createReadStream(`${root}/dist/images/stickers/${sticker}`).pipe(
      createWriteStream(`${root}/dist/comments/${filename}`)
    )

    let { insertId } = await db.query('INSERT INTO comments SET ?', comment)

    res.json({
      success: true,
      mssg: 'Commented!!',
      comment_id: insertId,
      filename,
    })
  } catch (error) {
    db.catchError(error, res)
  }
})

app.post('/delete-comment', async (req, res) => {
  let { comment_id, type, commentSrc } = req.body
  await db.query('DELETE FROM comments WHERE comment_id=?', [comment_id])

  if (type == 'image' || type == 'sticker') {
    unlinkSync(`${root}/dist/comments/${commentSrc}`)
  }

  res.json('H')
})

app.post('/edit-comment', async (req, res) => {
  let { comment_id, comment } = req.body
  await db.query('UPDATE comments SET text=? WHERE comment_id=?', [
    comment,
    comment_id,
  ])
  res.json('Hello, World!!')
})

module.exports = app
