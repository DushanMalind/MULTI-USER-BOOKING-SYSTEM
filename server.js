/*
const http = require('http');
const app = require('./app');
const { initSocket } = require('./utils/socket');

const server = http.createServer(app);
const io = initSocket(server);

// Pass socket.io instance to middleware
app.use((req, res, next) => {
    req.io = io;
    next();
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
*/

const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow frontend clients to connect
        methods: ["GET", "POST"]
    }
});

global.io = io; // Make `io` globally accessible in controllers

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(4000, () => console.log("Server running on port 4000"));

