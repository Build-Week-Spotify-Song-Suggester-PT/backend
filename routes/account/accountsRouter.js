const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../auth/secrets');

const db = require('./accountsModel.js');
// const authenticate = require('../auth/middleware.js'); NEED NAMED EXPORT/IMPORT

// router endpoints here

// ---------- POST - register account
/**
 * @api {post} /accounts/register Register account
 * @apiVersion 0.1.0
 * @apiName Register
 * @apiGroup Accounts
 * 
 * @apiParam {String} name User's name or preferred display name
 * @apiParam {String} email User's email, must be unique
 * @apiParam {String} password User's password
 * 
 * @apiParamExample Example body:
 * {
 *	"name": "Chidi",
 *	"email": "c.anagonye@stjohns.edu",
 *	"password": "trolleyproblem"
 * }
 * 
 * @apiSuccess {Number} id Account id
 * @apiSuccess {String} name User's name
 * @apiSuccess {String} email User's email
 * @apiSuccess {String} token Login token generated for the user
 * 
 * @apiSuccessExample Successful response: 
 *  HTTP/1.1 201 OK
 * {
 *   "id": 8,
 *   "name": "Chidi",
 *   "email": "c.anagonye@stjohns.edu",
 *   "token": "a really long string of letters and numbers, separated by dots"
 * }
*/
router.post('/register', (req, res) => {
    let account = req.body;
      account.password = bcrypt.hashSync(account.password, 8);
  
      db.createAccount(account)
          .then(user => {
            const token = generateToken(user)
            res.status(201).json({id: user.id, name: user.name, email: user.email, token: token})
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
          })
  });

// ---------- POST - log in to account  
/**
 * @api {post} /accounts/login Log in to account
 * @apiVersion 0.1.0
 * @apiName Login
 * @apiGroup Accounts
 * 
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 * 
 * @apiSuccess {String} welcome Welcome message that includes the user's name
 * @apiSuccess {String} token Login token generated for the user
 *  @apiSuccessExample Successful response: 
 *  HTTP/1.1 200 OK
 * {
 *   "message": "Welcome, Tahani!"
 *   "token": "a really long string of letters and numbers, separated by dots"
 * }
*/
  router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
      db.findByEmail({email})
      .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
              const token = generateToken(user)
              res.status(200).json({id: user.id, message: `Welcome ${user.name}!`, token: token });
          } else {
              res.status(401).json({ message: 'Unable to log in to account.'});
          }
        })
        .catch(error => {
          res.status(500).json(error);
        });
  });
  


  function generateToken(user) {
    const payload = {
        username: user.email,
    };
    const options = {
        expiresIn: '1d',
    };
    return jwt.sign(payload, secrets.jwtSecret, options);
  }
  
  module.exports = router;
  