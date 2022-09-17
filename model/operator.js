const mongoose = require('./mongoose')

const operatorSchema = new mongoose.Schema(
	{
		name: String,
		passwordHash: String,
    phone: Number,
    operatorID: String
	},
	{
		collection: 'operators',
	}
)

operatorSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id.toString()
		delete ret._id
		delete ret.__v
	},
})

const OperatorModel = mongoose.model('operator', operatorSchema)

module.exports = OperatorModel
