const archiver = require('archiver')
const download = require('download-git-repo')
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const { nanoid } = require('nanoid')
const store = require('data-store')({
	path: path.resolve(__dirname, '../data/modules.json')
})

module.exports = function (spec) {
  return new Promise((resolve, reject) => {
		try {
			var _id = nanoid()
			download('direct:' + spec.repo + '/archive/master.zip', path.resolve(__dirname, 'dist/' + _id), function (err) {
				if (err) {
					console.error(err)
					reject(new Error('Failed to Download Module'))
				} else {
					var moduleSpec = {
						_id: _id,
						name: spec.module_name,
						repo: spec.repo,
						dev: spec.dev,
						poppos: 0,
						popmin: 0,
						config: spec.conf,
						desc: spec.desc,
						update: new Date(),
						thumb: spec.thumb
					}
					store.union('lists', moduleSpec)
					if (fs.existsSync(path.resolve(__dirname, 'dist', _id))) {
			  		console.log('The path exists.')
						// create a file to stream archive data to.
						var output = fs.createWriteStream(path.resolve(__dirname, 'dist', _id + '.zip'))
						// Set the compression format to zip
						var archive = archiver('zip', {
							zlib: { level: 9 } // Sets the compression level.
						})
						// listen for all archive data to be written
						// 'close' event is fired only when a file descriptor is involved
						output.on('close', function () {
							console.log(archive.pointer() + ' total bytes');
							console.log('archiver has been finalized and the output file descriptor has closed.')
							rimraf(path.resolve(__dirname, 'dist/' + _id), function (err) {
								if (err) {
									console.error(err)
									reject(new Error('Failed to Remove Dir'))
								} else {
									resolve('Success')
								}
							})
						})
						// This event is fired when the data source is drained no matter what was the data source.
						// It is not part of this library but rather from the NodeJS Stream API.
						// @see:   https://nodejs.org/api/stream.html#stream_event_end
						output.on('end', function () {
							console.log('Data has been drained')
						})
						// good practice to catch this error explicitly
						archive.on('error', function (err) {
							console.error(err)
							reject(new Error('Failed to Archive'))
						})
						// pipe archive data to the file
						archive.pipe(output)
						// append files from a sub-directory, putting its contents at the root of archive
						archive.directory(path.resolve(__dirname, 'dist', _id), false)
						// finalize the archive (ie we are done appending files but streams have to finish yet)
						// 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
						archive.finalize()
					} else {
			      reject(new Error('Failed to Archive, Not Found'))
					}
				}
			})
		} catch (error) {
			console.error(error)
      reject(new Error('Failed'))
		}
	})
}
