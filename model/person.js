const mongoose = require('./mongoose')

const personSchema = new mongoose.Schema(
	{
		name: String,
    phone: Number,
    aadhar: Number,
		documents: {
			identity: {
				name: String,
				raw: Buffer,
				data: Buffer,
				contentType: String,
			},
			address: {
				name: String,
				raw: Buffer,
				data: Buffer,
				contentType: String,
			},
			dob: {
				name: String,
				raw: Buffer,
				data: Buffer,
				contentType: String,
			},
			relationship: {
				name: String,
				raw: Buffer,
				data: Buffer,
				contentType: String,
			},
		},
	},
	{
		collection: 'People',
	}
)

personSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id.toString()
		delete ret._id
		delete ret.__v
	},
})

const PersonModel = mongoose.model('person', personSchema)

module.exports = PersonModel
