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
