const mongoose = require('mongoose')

const mongo_url = process.env.MONGO_URL_2

// console.log(mongo_url)

mongoose
	.connect(mongo_url)
	.then(() => {
		console.log('db connected')
	})
	.catch((err) => {
		console.log(err.message)
	})

module.exports = mongoose