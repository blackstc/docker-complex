const keys = require('./keys')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const { Pool } = require('pg')
console.log(keys)
const pgClient = new Pool({
  host: keys.pgHost,
  user: keys.pgUser,
  database: keys.pgDatabase,
  port: keys.pgPort,
  password: keys.pgPassword
})

pgClient.on('error', () => console.log('Lost PG connection'))

pgClient
  .query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send(pgClient)
})

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * from values')
  res.send(values.rows)
})

app.get('/values/current', (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.send(values)
  })
})

app.post('/values', async (req, res) => {
  const { index } = req.body

  if (parseInt(index) > 40) {
    return res.status(422).send('Index too high')
  }

  pgClient.query('INSERT INTO values(number) VALUES($1)', [index])

  res.send({ working: true })
})

app.listen(5000, () => console.log('Listening'))
