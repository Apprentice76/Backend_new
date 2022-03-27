// require('dotenv').config()

const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const userdb = [
	{
		user: 'test-user@dummy.com',
		// password: 'test-password',
		password:
			'$2b$10$ohVG/Uo31OkYj6WsXF6PgOsEqayuPH.zSlJ1JTa0svBy.7FXf5r7a',
	},
]

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', async (_, res) => {
    // console.log(await bcrypt.hash('test-password', 10))
    return res.status(200).send('<h1>Server Running!</h1>')
})

app.post('/register', async (req, res) => {
	// registration logic
	try {
		const { usr, pwd } = req.body
		const exists = userdb.find({ user: usr }) && true

		if (exists) {
			return res.status(400).send({
				message: 'User already exists, please login.',
			})
		}
		const encryptedPass = await bcrypt.hash(pwd, 10)

		const newUser = {
			user: usr,
			password: encryptedPass,
		}

		userdb.push(newUser)

		const token = jwt.sign({ usr }, process.env.TOKEN_SECRET, {
			expiresIn: '1d',
		})

		newUser.token = token

		return res.status(201).json(newUser)
	} catch (err) {
		console.log(err.message)
	}
})

app.post('/login', async (req, res) => {
	// login logic
	try {
		const { usr, pwd } = req.body

        // console.log('usr: ', usr, ', pass: ', pwd)

		if (!(usr && pwd)) {
			return res.status(400).send({ message: 'Input field(s) empty.' })
		}

		const user = userdb.find( o => o.user === usr)

		if (user && (await bcrypt.compare(pwd, user.password))) {
			const token = jwt.sign({ usr }, process.env.TOKEN_SECRET_64, {
				expiresIn: '1d',
            })
            
            userDetails = {
                user: user.user,
                token: token
            }

			// userDetails.token = token

			return res.status(201).json(userDetails)
        }
        return res.status(400).send({ message: 'Invalid Credentials.' })
	} catch (err) {
		console.log(err.message)
	}
})

const verifyToken = (req, res, next) => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token === null) return res.status(403).send({ message: 'User not logged in.' })

	try {
		const user = jwt.verify(token, process.env.TOKEN_SECRET_64)
		req.user = user
	} catch (err) {
		return res.status(401).send('Token expired or invalid.')
	}

	next()
}

app.get('/getqr', verifyToken, () => { })

app.get('/checkValidity', verifyToken, (req, res) => { 
    res.status(200).send({message: 'Token Valid'})
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`)
})
