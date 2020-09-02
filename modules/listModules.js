const path = require('path')
const qs = require('querystring')
const store = require('data-store')({
	path: path.resolve(__dirname, '../data/modules.json')
})

module.exports = function (key) {
	return new Promise((resolve, reject) => {
		if (key) {
			try {
				store.load()
				var allModules = store.get('lists')
				for (var i = 0; i < allModules.length; i++) {
					// console.log('Config: ', qs.parse(allModules[i]['config']))
					allModules[i]['config'] = qs.parse(allModules[i]['config'])
				}
				var moduleSpec = []
				if (key.name) {
					moduleSpec = allModules.filter(obj => {
						// console.log(obj._id)
						// return obj._id === id
						return obj.name.toString().toLowerCase().includes(key.name.toString().toLowerCase())
					})
				} else if (key.id) {
					moduleSpec = allModules.filter(obj => {
						// console.log(obj._id)
						return obj._id === key.id
					})
				} else if (key.author) {
					moduleSpec = allModules.filter(obj => {
						// console.log(obj._id)
						// return obj._id === id
						return obj.dev.toString().toLowerCase().includes(key.author.toString().toLowerCase())
					})
				} else if (key.popularity) {
					if (isNaN(key.popularity)) {
						moduleSpec = []
					} else {
						moduleSpec = allModules.filter(obj => {
							// console.log(obj._id)
							// return obj._id === id
							return (Number(obj.poppos) + Number(obj.popmin)) >= Number(key.popularity)
						})
					}
				} else {
					moduleSpec = allModules
				}
				// console.log('Module Spec', moduleSpec)
				resolve(moduleSpec)
			} catch (err) {
				console.error(err)
	      reject(new Error('Failed to Retrieve Module'))
			}
		} else {
			try {
				store.load()
				if (store.get('lists')) {
					var allModules = store.get('lists')
					for (var i = 0; i < allModules.length; i++) {
						// console.log('Config: ', qs.parse(allModules[i]['config']))
						allModules[i]['config'] = qs.parse(allModules[i]['config'])
					}
					resolve(allModules)
				} else {
					resolve([])
				}
			} catch (err) {
				console.error(err)
	      reject(new Error('Failed to List Modules'))
			}
		}
	})
}
