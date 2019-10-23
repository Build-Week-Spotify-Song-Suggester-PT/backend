const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../auth/secrets');
const { authenticate } = require('../../auth/middleware')
const axios = require('axios');

const db = require('./musicModel.js');


module.exports = router;

// ---------- POST - save song to favs
/**
 * @api {post} /music/save Save song to favorites
 * @apiVersion 0.1.0
 * @apiName Save song to favorites
 * @apiGroup Music
 * 
 * @apiParam {String} track_id The spotify track_id unique to each song.
 * @apiParam {Number} [account_id] THIS IS PULLED FROM THE TOKEN OF THE LOGGED IN ACCOUT. Don't actually add it to the request -- just putting this here so we know that the songs will be saved to the currently logged in account.
 * 
 * @apiParamExample Example body:
 * {
 *	"track_id": "5lzb11BOouSBDXxhTnTtpv",
 * }
 * 
 * @apiSuccess {String} message A message indicating the song was successfully saved to favorites list.
 * 
 * @apiSuccessExample Successful response: 
 *  HTTP/1.1 201 OK
 * {
 *   "message": "Song saved to favorites."
 * }
*/
router.post('/save', authenticate, (req, res) => {
    const track_id = req.body.track_id
    const account_id = req.account.id
    axios.get(`https://song-suggester.herokuapp.com/getlike?seed=${track_id || "0815epvZrVtP00ARbscMLt"}&num=0`)
        .then(resp => {
            db.saveSong(resp.data.seed, account_id)
                .then(() => {
                    res.status(201).json({message: "Song saved to favorites."})
                })
                .catch(err => console.log(err))
        })
        .catch(err => res.status(500).json({error: "Unable to save the song to favorites."}))
})

// ---------- POST - send a song ID, get its audio features
/**
 * @api {post} /music/singletrack Get single song audio features
 * @apiVersion 0.1.0
 * @apiName Single song audio features
 * @apiGroup Music
 * 
 * @apiParam {String} track_id The spotify track_id unique to each song.
 * 
 * @apiParamExample Example body:
 * {
 *	"track_id": "5lzb11BOouSBDXxhTnTtpv",
 * }
 * 
 * @apiSuccess {Object} song An object that contains all the song info, including all audio features.
 * 
 * @apiSuccessExample Successful response: 
 *  HTTP/1.1 200 OK
 * {
 * "track_id": "2fWgvpvay6JWLboUtfvitp",
 *  "track_name": "Magic",
 *  "artist_name": "Craig David",
 *  "acousticness": 0.0898,
 *  "danceability": 0.716,
 *  "duration_ms": 193001,
 *  "energy": 0.839,
 *  "instrumentalness": 0.00000336,
 *  "key": 10,
 *  "liveness": 0.0711,
 *  "loudness": -4.945,
 *  "mode": false,
 *  "speechiness": 0.0379,
 *  "tempo": 107.011,
 *  "time_signature": 4,
 *  "valence": 0.703,
 *  "popularity": 50
 * }
*/
router.post('/singletrack', (req, res) => {
    const track_id = req.body.track_id
    axios.get(`https://song-suggester.herokuapp.com/getlike?seed=${track_id || "0815epvZrVtP00ARbscMLt"}&num=0`)
        .then(resp => {
            // console.log(resp.data.seed)
            const song = resp.data.seed
            return res.status(200).json(song);
        })
        .catch(err => res.status(500).json({error: err}))
})

// ---------- POST - send a song ID, get similar songs
/**
 * @api {post} /music/similar Get similar songs
 * @apiVersion 0.1.0
 * @apiName Similar songs
 * @apiGroup Music
 * 
 * @apiParam {String} track_id The spotify track_id unique to each song.
 * @apiParam {Number} [number]_like The number of songs you'd like returned. Defaults to 100 similar songs.
 * 
 * @apiParamExample Example body:
 * {
 *	"track_id": "5lzb11BOouSBDXxhTnTtpv",
 *  "number_like": 2
 * }
 * 
 * @apiSuccess {Object[]} song An object that contains all the song info, including all audio features.
 * 
 * @apiSuccessExample Successful response: 
 *  HTTP/1.1 200 OK
 * [
 *   {
 *    "track_id": "2fWgvpvay6JWLboUtfvitp",
 *    "track_name": "Magic",
 *    "artist_name": "Craig David",
 *    "acousticness": 0.0898,
 *    "danceability": 0.716,
 *    "duration_ms": 193001,
 *    "energy": 0.839,
 *    "instrumentalness": 0.00000336,
 *    "key": 10,
 *    "liveness": 0.0711,
 *    "loudness": -4.945,
 *    "mode": false,
 *    "speechiness": 0.0379,
 *    "tempo": 107.011,
 *    "time_signature": 4,
 *    "valence": 0.703,
 *    "popularity": 50
 *   }, {
 *    "track_id": "01RV4oaMhx0RXhSWqLUSwV",
 *    "track_name": "Carta De Luto",
 *    "artist_name": "Los Alegres De Teran",
 *    "acousticness": 0.733,
 *    "danceability": 0.718,
 *    "duration_ms": 163161,
 *    "energy": 0.403,
 *    "instrumentalness": 0.0,
 *    "key": 5,
 *    "liveness": 0.0414,
 *    "loudness": -8.343,
 *    "mode": true,
 *    "speechiness": 0.0528,
 *    "tempo": 125.453,
 *    "time_signature": 4,
 *    "valence": 0.963,
 *    "popularity": 7    
 *   }
 * ]
 * 
*/
router.post('/similar', (req, res) => {
    const track_id = req.body.track_id
    const number_like = req.body.number_like
    axios.get(`https://song-suggester.herokuapp.com/getlike?seed=${track_id || "0815epvZrVtP00ARbscMLt"}&num=${number_like || 100}`)
        .then(resp => {
            // console.log(resp.data)
            const song = resp.data
            return res.status(200).json(song);
        })
        .catch(err => res.status(500).json({error: err}))
})


// ---------- DELETE - delete a song from favorites 
/**
 * @api {delete} /music/ Delete a song from favorites (WIP)
 * @apiVersion 0.1.0
 * @apiName Delete a song
 * @apiGroup Music
*/

//////////////////////////////////////////////////////////////////////////


/** 
 * -- get ONE song, with data attributes
 * -- get songs by feature
 * 
 * -- save a song
 * -- save multiple songs
 * 
 * 
 * 
*/