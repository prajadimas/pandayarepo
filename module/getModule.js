const listModules = require('../modules/listModules')
const downloadModule = require('../modules/downloadModule')
const path = require('path')
const store = require('data-store')({
	path: path.resolve(__dirname, '../data/modules.json')
})

module.exports = function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log('accessing [API]: ', req.method + ' ' + req.originalUrl || req.url, 'CLIENT ACCESS from', ip)
  console.log('query size', Object.keys(req.query).length)
  console.log('query', req.query)
  if (Object.keys(req.query).length > 0) {
    if (req.query.find) {
			if (req.query.find === 'name') {
				if (req.query.detail) {
					listModules({ name: req.query.detail })
		      .then(result => {
		        // console.log('Result Name', result)
		        res.status(200).json({
		          message: 'Module Lists',
		          data: result
		        })
		      })
		      .catch(error => {
		        console.error(error)
		        res.status(500).json({
		          message: 'Not OK'
		        })
		      })
				} else {
					res.status(400).json({
		        message: 'OK, but Forbidden'
		      })
				}
			} else if (req.query.find === 'popularity') {
				if (req.query.detail) {
					listModules({ popularity: req.query.detail })
					.then(result => {
						// console.log('Result Popularity', result)
						res.status(200).json({
							message: 'Module Lists',
							data: result
						})
					})
					.catch(error => {
						console.error(error)
						res.status(500).json({
							message: 'Not OK'
						})
					})
				} else {
					res.status(400).json({
						message: 'OK, but Forbidden'
					})
				}
			} else if (req.query.find === 'author') {
				if (req.query.detail) {
					listModules({ author: req.query.detail })
		      .then(result => {
		        // console.log('Result Author', result)
		        res.status(200).json({
		          message: 'Module Lists',
		          data: result
		        })
		      })
		      .catch(error => {
		        console.error(error)
		        res.status(500).json({
		          message: 'Not OK'
		        })
		      })
				} else {
					res.status(400).json({
		        message: 'OK, but Forbidden'
		      })
				}
			} else if (req.query.find === 'id') {
				if (req.query.detail) {
					listModules({ id: req.query.detail })
		      .then(result => {
		        // console.log('Result Author', result)
		        res.status(200).json({
		          message: 'Module Lists',
		          data: result
		        })
		      })
		      .catch(error => {
		        console.error(error)
		        res.status(500).json({
		          message: 'Not OK'
		        })
		      })
				} else {
					res.status(400).json({
		        message: 'OK, but Forbidden'
		      })
				}
			} else {
				res.status(400).json({
	        message: 'OK, but Forbidden'
	      })
			}
    } else if (req.query.id) {
      downloadModule(req.query.id)
      .then(result => {
        console.log('Result: ', result)
				if (result.includes('Ready')) {
					res.download(result.split(' ')[0])
				} else {
					res.status(200).json({
	          message: 'No Module'
	        })
				}
      })
      .catch(error => {
        console.error(error)
        res.status(500).json({
          message: 'Not OK'
        })
      })
    } else {
      res.status(400).json({
        message: 'OK, but Forbidden'
      })
    }
  } else {
    listModules()
    .then(result => {
      console.log('Result: ', result)
      res.status(200).json({
        message: 'Module Lists',
        data: result
      })
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({
        message: 'Not OK'
      })
    })
  }
}
