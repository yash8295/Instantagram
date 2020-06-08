const db = require('./db'),
  { promisify } = require('util'),
  { unlink } = require('fs'),
  root = process.cwd()

const getLastMssgTime = async con_id => {
  let s = await db.query(
    'SELECT MAX(message_time) AS ti FROM messages WHERE con_id = ?',
    [con_id]
  )
  return s[0].ti
}

const getLastMssg = async con_id => {
  let [{ last }] = await db.query(
    'SELECT MAX(message_id) AS last FROM messages WHERE con_id = ?',
    [con_id]
  )
  let l = await db.query(
    'SELECT message, type, mssg_by FROM messages WHERE message_id=?',
    [last]
  )
  return l[0]
}

const deleteCon = async con_id => {
  try {
    let messages = await db.query(
        'SELECT message, type FROM messages WHERE con_id=?',
        [con_id]
      ),
      deleteMessageFile = promisify(unlink)

    for (let m of messages) {
      if (m.type != 'text') {
        await deleteMessageFile(`${root}/dist/messages/${m.message}`)
      }
    }

    await db.query('DELETE FROM messages WHERE con_id=?', [con_id])
    await db.query('DELETE FROM conversations WHERE con_id=?', [con_id])
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getLastMssgTime,
  getLastMssg,
  deleteCon,
}
