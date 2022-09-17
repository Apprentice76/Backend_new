const mongoose = require('./mongoose')

const loggerSchema = new mongoose.Schema(
	{
		operatorID: String,
		operatorLog: [
			{
				date: String,
				logs: [
					{
						userId: String,
						logString: String,
					},
				],
			},
		],
	},
	{
		collection: 'dataLog',
	}
)

loggerSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id.toString()
		delete ret._id
		delete ret.__v
	},
})

const LoggerModel = mongoose.model('dataLog', loggerSchema)

module.exports = LoggerModel