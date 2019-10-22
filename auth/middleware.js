// MIDDLEWARE GOES HERE!
const jwt = require('jsonwebtoken')
const secrets = require('./secrets')

module.exports = {
    authenticate,
}

// authenticate
function authenticate (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err) {
              res.status(401).json({ message: 'Invalid Credentials.' });
            } else {
              req.account = {  id: decodedToken.id, email: decodedToken.email }
              next();
            }
          })
    } else {
        res.status(400).json({message: 'Please log in and try again!'});
    }
}


// validate POST bodies