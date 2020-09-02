const registerModule = require('../modules/registerModule')

module.exports = function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log('accessing [API]: ', req.method + ' ' + req.originalUrl || req.url, 'CLIENT ACCESS from', ip)
  console.log('body', req.body)
  registerModule(req.body)
  .then(result => {
    console.log('Result: ', result)
    res.status(200).json({
      message: 'Success'
    })
  })
  .catch(error => {
    console.error(error)
    res.status(500).json({
      message: 'Not OK'
    })
  })
}
