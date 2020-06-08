const db = require('./Mysql')

const query = (q, data) => {
  return new Promise((resolve, reject) => {
    db.query(q, data, (err, res) => (err ? reject(err) : resolve(res)))
  })
}

const c_validator = (field, req) => {
  let i = field.charAt(0).toUpperCase() + field.substr(1)
  req.checkBody(field, `${i} is empty!!`).notEmpty()
  req.checkBody(field, `${i} must be greater than 4`).isLength({ min: 4 })
  req.checkBody(field, `${i} must be less than 32`).isLength({ max: 32 })
}

const toHashtag = async (str, user, post) => {
  let hashtags = str.match(/[^|\s]?#[\d\w]+/g)

  if (hashtags) {
    for (let h of hashtags) {
      let hash = h.slice(1)
      if (hash.substr(0, 1) !== '#') {
        let newHashtag = {
          hashtag: h,
          post_id: post,
          user: user,
          hashtag_time: new Date().getTime(),
        }
        await query('INSERT INTO hashtags SET ?', newHashtag)
      }
    }
  }
}

const tf = value => (value == 1 ? true : false)

const catchError = (error, res) => {
  console.log(error)
  res.json({ mssg: 'An error occured!!' })
}

module.exports = {
  query,
  c_validator,
  toHashtag,
  tf,
  catchError,
}
