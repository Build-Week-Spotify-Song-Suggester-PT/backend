require('dotenv').config();

const port = process.env.PORT || '6000';
const server = require('./server.js');

server.listen(port, console.log(`*** Server listening on port ${port} ***`)) 