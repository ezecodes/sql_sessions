const sql = require('mysql')
const {sqlConfig} = require('./config')

const sqlDB = sql.createConnection({...sqlConfig})

module.exports = sqlDB