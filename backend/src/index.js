const express = require('express');
const mongose = require('mongoose');
const cors = require('cors');
const http = require('http')
const routes = require('./routes')
const { setupWebsocket } = require('./utils/websocket')

const app = express();
const server = http.Server(app)

setupWebsocket(server)

mongose.connect('mongodb+srv://maycon:maycon@cluster0-bt8db.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,    
})

app.use(cors())
app.use(express.json())
app.use(routes)
server.listen(3333);