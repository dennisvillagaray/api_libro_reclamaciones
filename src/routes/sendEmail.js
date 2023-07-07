const express = require('express');
const router = express.Router()

const emailFrom = const dbPassword = process.env.EMAIL

const sendEmail = require('../utils/sendgrid.js')


const preparedEmail = (req, res) => {
  
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

  const subject = `Libro Reclamaciones N° [${correlativo}]`

  const bien = bien_contratado_id == 1 ? 'PRODUCTO' : ' SERVICIO'
  const tipo_pedido = tipo_pedido_id == 1 ? 'RECLAMO' : 'QUEJA'
  const isFather = nombre_padres != "" & nombre_padres != null ? `<strong>Nombre Padres: </strong>${nombre_padres}<br>` : null

  const output = `
    <strong>Fecha Creacion: </strong> ${fecha_creacion}<br>
    <strong>Serie: </strong> N° ${correlativo}<br>
    <strong>Dni: </strong>"${dni_ce}<br>
    <strong>Nombre y Apellidos: </strong> ${nombre_apellido} <br>
    ${isFather}
    <strong>Domicilio: </strong>${domicilio}<br>
    <strong>telefono: </strong>${telefono} <br>
    <strong>Email: </strong>${email}<br>
    <strong>Nombre Comercio Afiliado: </strong>${nombre_comercio_afiliado}<br>
    <strong>Ruc Comercio Afiliado: </strong>${ruc_comercio_afiliado}<br>
    <strong>Bien Contratado: </strong> ${bien}<br>
    <strong>Monto Reclamado: </strong> S/. ${monto_reclamo}<br>
    <strong>Descripcion: </strong>${descripcion}<br>
    <strong>Tipo Pedido: </strong>${tipo_pedido}<br>
    <strong>Detalle Reclamo: </strong>${detalle_reclamo}<br>
    <strong>Pedido Consumidor: </strong>${pedido_consumidor}<br>
    `
  sendEmail(email, emailFrom, subject, output, res)
}

module.exports = preparedEmail
