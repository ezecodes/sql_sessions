require('dotenv').config()
const config = {
	sqlConfig: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME
	},
	port: process.env.PORT,
	jwtsecret: process.env.JWT_SECRET
}

module.exports = config