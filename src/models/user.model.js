const db = require('../config/sql_config')
const bcrypt = require('bcrypt')

class User {
	constructor(email, password) {
		this.email = email
		this.password = password
	}

	async save(email, password) {
		const date = new Date()
		const [year, momth, day] = [
			date.getFullYear(),
			date.getMonth() + 1,
			date.getDay()
		]
		const created = `${year}-${momth}-${day}`

		const salt = await bcrypt.genSalt()
		this.password = await bcrypt.hash(this.password, salt)

		const sql = `
			INSERT INTO users(
				email,
				password,
				created
			)
			VALUES(
				'${this.email}',
				'${this.password}',
				'${created}'
			)
		`
		try {
			const query = await db.query(sql)
		} catch (err) {
			console.log('ERRR'+ err)
		}

	}

	get findUsers() {

	}
}

module.exports = User