const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const accountsRouter = require('./routes/account/accountsRouter')
const musicRouter = require('./routes/music/musicRouter')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/accounts', accountsRouter);
server.use('/music', musicRouter);

server.get('/', (req, res) => {
    res.send(`API is running! Woohoo!`)
});

/**
 * get song
 * return fav songs
 *  easy to access the audio features
 * 
 * 
 */

module.exports = server;