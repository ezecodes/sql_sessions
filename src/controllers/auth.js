const bcrypt = require('bcrypt')
const errorHandler = require('../helpers/dbErrors')
const db = require('../config/sql_config')
const {v4: uuid} = require('uuid')

module.exports.login = async function (req, res) {
	const { email, password } = req.body
	if (!email || !password) {
		return res.status(401).send('Please enter the correct credentials')
	}

	const sql = 'SELECT email, password, userId FROM users WHERE email = ?'
	db.query(sql, [email], async (err, doc) => {
		if (err) errorHandler(err)
		if (doc.length === 0) return res.status(401).send("Incorrect credentials")

		const is_correct_password = await bcrypt.compare(password, doc[0].password)
		if (!is_correct_password) return res.status(401).send("Please enter the correct credentials")
		
		
	})	
}

module.exports.register = async function (req, res) {
	let { email, password } = req.body
	if (!email || !password) return res.status(401).send({error: 'enter your correct credentials'})
	const date = new Date()
	const [year, momth, day] = [
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDay()
	]
	const created_at = `${year}-${momth}-${day}`
	const uuidOptions = {
		msecs: date.getTime()
	}
	const userId = uuid(uuidOptions)

	const salt = await bcrypt.genSalt()
	password = await bcrypt.hash(password, salt)

	const sql = `
		INSERT INTO users(
			userId,
			email,
			password,
			created_at
		)
		VALUES(
			'${userId}',
			'${email}',
			'${password}',
			'${created_at}'
		)
	`
	db.query(sql, (err, doc) => {
		if (err) {
			return res.status(401).json(errorHandler(err))
		}

		res.status(200).json({userId})
	})

}
