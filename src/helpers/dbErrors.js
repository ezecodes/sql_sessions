
module.exports = function (err) {
	const errors = {
		email: '',
		password: ''
	}
	const [code, errno, sqlMessage, sqlState] = Object.values(err)

	if (code === 'ER_DUP_ENTRY') {
		if (sqlMessage.includes('email')) {
			return {...errors, email: 'This email has been registered'}
		}
	}
	if (code === 'ER_BAD_FIELD_ERROR') {

	}
	return ''
}