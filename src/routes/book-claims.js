const express = require('express');
const router = express.Router()
const mysqlConnection = require('../config/database')

const preparedEmail = require('./sendEmail')


router.get('/', (req, res) => {
  mysqlConnection.query('SELECT MAX(correlativo) FROM folio_reclamaciones', (err, rows, fields) => {
    if (!err) {
      res.send(rows[0]['MAX(correlativo)'])
    } else {
      console.log('error -> ', err)
      throw err
    }
  })
})

router.post('/sendemail', (req, res) => {
  const estado = 1
  const {
    correlativo,
    bien_contratado_id,
    tipo_pedido_id,
    nombre_padres,
    fecha_creacion,
    dni_ce,
    nombre_apellido,
    domicilio,
    telefono,
    email,
    nombre_comercio_afiliado,
    ruc_comercio_afiliado,
    monto_reclamo,
    descripcion,
    detalle_reclamo,
    pedido_consumidor
  } = req.body
  // const { id } = req.params
  const query =
    'insert into folio_reclamaciones (  bien_contratado_id, tipo_pedido_id, correlativo, fecha_creacion, nombre_apellidos, dni_ce, domicilio, telefono, email, nombre_comercio_afiliado,ruc_comercio_afiliado, nombre_padres, monto_reclamado, descripcion, detalle_reclamo, pedido_consumidor, estado)  values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'

  mysqlConnection.query(query, [
    bien_contratado_id,
    tipo_pedido_id,
    correlativo,
    fecha_creacion,
    nombre_apellido,
    dni_ce,
    domicilio,
    telefono,
    email,
    nombre_comercio_afiliado,
    ruc_comercio_afiliado,
    nombre_padres,
    monto_reclamo,
    descripcion,
    detalle_reclamo,
    pedido_consumidor,
    estado
  ], (err, rows, fields) => {
    !err ? preparedEmail(req, res) : res.send({
      Status: 'No se pudo inserart el nuevo reclamo',
      err
    })
  })
})

module.exports = router
