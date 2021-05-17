const express = require('express')
const cors = require('cors')
const socket = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)

app.use(cors())

const io = socket(server, {
    cors: {
        origin: "*",
        methods: [ 'GET', 'POST' ]
    }
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

io.on('connection', (socket) => {
    socket.emit('connected', socket.id)

    socket.on('disconnect', () => {
        socket.broadcast.emit("call ended")
    })

    socket.on("call", ({ user, signalData, from, name }) => {
        io.to(user).emit("call", {signal: signalData, from, name})
    })

    socket.on("answer", (data) => {
        io.to(data.to).emit("accepted", data.signal)
    })
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
    console.log("server is running on port " + PORT)
})