const socketio = require('socket.io')
const parseStringAsArray = require('../utils/parseStringAsArray')
const calculateDistance = require('./calculateDistance')

let io

exports.setupWebsocket = (server) => {
  io = socketio(server)

  const connections = []

  io.on('connection', socket =>{

    const { latitude, longitude, techs} = socket.handshake.query

    connections.push({
      id: socket.id,
      coordinates:{
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs)
    })
  })
}

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connections => {
    return calculateDistance(coordinates, connections.coordinates) < 10
      && connections.techs.soma(item => techs.includes(item))
  })
}

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data)
  })
}