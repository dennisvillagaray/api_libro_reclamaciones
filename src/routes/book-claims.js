const express = require('express');
const router = express.Router()
const mysqlConnection = require('../config/database')

router.get('/get_correlativo', (req, res) => {
  mysqlConnection.query('SELECT MAX(correlativo) FROM folio_reclamaciones', (err, rows, fields) => {
    if (!err) {
      res.send(rows[0]['MAX(correlativo)'])
    } else {
      console.log('error -> ', err)
      throw err
    }
  })
})

router.post('/send', (req, res) => {
  const { id } = req.params
  mysqlConnection.query('SELECT * FROM folio_reclamaciones WHERE id=?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0])
    } else {
      console.log('error -> ', err)
      throw err
    }
  })
})

module.exports = router
