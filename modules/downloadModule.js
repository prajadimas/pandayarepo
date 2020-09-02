const path = require('path')
const fs = require('fs')
/* var urlGitDemo = [
  'https://github.com/prajadimas/bidangmiring',
  'https://github.com/prajadimas/demo',
  'https://github.com/prajadimas/grtech',
  'https://github.com/prajadimas/learningregression',
  'https://github.com/prajadimas/bankboss',
  'https://github.com/prajadimas/bankboss',
  'https://github.com/prajadimas/terserahin',
  'https://github.com/prajadimas/repotesto'
] */

module.exports = function (id) {
  return new Promise((resolve, reject) => {
    try {
      if (fs.existsSync(path.resolve(__dirname, 'dist', id + '.zip'))) {
        // file exists
        resolve(path.resolve(__dirname, 'dist', id + '.zip') + ' Ready')
      } else {
        resolve('Not Found')
      }
    } catch (err) {
      console.error(err)
      reject(new Error('Failed'))
    }
  })
}
