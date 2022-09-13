const app = require('./app')
const server = require('http').createServer(app)
const {port} = require('./src/config/config')
const db = require('./src/config/sql_config')

app.use((err, req, res, next) => {
	console.log(err.stack)
	console.log(err.name)
	console.log(err.code)

	res.status(500).json({message: 'something went wrong'})

})

db.connect(err => {
	if (err) throw err
	console.log('db connected!')
})

server.listen(port, () => console.log(`server on port ${port}`))