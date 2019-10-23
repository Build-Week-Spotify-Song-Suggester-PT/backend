const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../auth/secrets');
const { authenticate } = require('../../auth/middleware')

const db = require('./accountsModel.js');
const musicDB = require('../music/musicModel')

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
 * @apiSuccess {Number} id User's unique account ID
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
    .first()
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

// GET ALL ACCOUNT INFO -- WIP
// router.get('/:id', authenticate, (req, res) => {
// const { id } = req.params.id;
// let accountInfo = []
//     db.findById(id)
//     .then(user => {
//         // musicDB.getSavedSongs(id)
//         // .then(songs => {
//         //     res.status(200).json(songs)
//         // })
//         // .catch(err => res.status(500).json(err))

//         res.status(200).json(user);
//     })
//     .catch(error => {
//         console.log(error);
//     });
// });
  
// ---------- GET - get all saved songs by account ID
/**
 * @api {get} /accounts/:id/favorites Get all songs saved to favorites
 * @apiVersion 0.1.0
 * @apiName Get account info
 * @apiGroup Accounts
 * 
 * @apiSuccess {Objects[]} favorites An array containing all the user's saved songs. Each object in the array is a single song with a list of all its audio attributes.
 *  @apiSuccessExample Successful response: 
 *  HTTP/1.1 200 OK
 * {
 *    [
 *       {
 *         "track_id": "2fWgvpvay6JWLboUtfvitp",
 *          "track_name": "Magic",
 *          "artist_name": "Craig David",
 *          "acousticness": 0.0898,
 *          "danceability": 0.716,
 *          "duration_ms": 193001,
 *          "energy": 0.839,
 *          "instrumentalness": 0.00000336,
 *          "key": 10,
 *          "liveness": 0.0711,
 *          "loudness": -4.945,
 *          "mode": false,
 *          "speechiness": 0.0379,
 *          "tempo": 107.011,
 *          "time_signature": 4,
 *          "valence": 0.703,
 *          "popularity": 50
 *        }
 *    ]
 * }
*/
router.get('/:id/favorites', authenticate, (req, res) => {
    const id = req.params.id
    musicDB.getSavedSongs(id)
        .then(songs => {
            res.status(200).json(songs)
        })
        .catch(err => res.status(500).json(err))
})
/**
 * @api {delete} /accounts/:id Delete account
 * @apiVersion 0.1.0
 * @apiName Delete account
 * @apiGroup Accounts
 * 
 * @apiParam {Number} id User's unique account ID. Endpoint will check to make sure you're logged into the account you're trying to delete.
 * 
 * @apiSuccess {string} message A "sorry to see you go" goodbye message.
 * @apiSuccessExample Successful response: 
 *  HTTP/1.1 200 OK
 * {
 *    "message": "We're sorry to see you go!"
 * }
*/
router.delete('/:id', authenticate, (req, res) => {
    const id = req.params.id
    if (id == req.account.id) {
        db.deleteAccount(id)
        .then(() => res.status(200).json({message: "We're sorry to see you go!"}))
        .catch(err => console.log(err))
    } else {
        // console.log(id, req.account.id)
        return res.status(403).json({message: "You must be logged into the account you wish to delete."})
    }
    
})

////////////////////////////////////////////////////////////

function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email
    };
    const options = {
        expiresIn: '1d',
    };
    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
  