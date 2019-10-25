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
    axios.get(`https://song-suggester.herokuapp.com/get_like?seed=${track_id || "0815epvZrVtP00ARbscMLt"}&num=0`)
        .then(resp => {
            db.saveSong(resp.data.seed, account_id, track_id)
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
    axios.get(`https://song-suggester.herokuapp.com/get_like?seed=${track_id || "0815epvZrVtP00ARbscMLt"}&num=0`)
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
 * @apiSuccess {Object[]} song An array with all returned song objects, which each include tack info and audio features.
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
    axios.get(`https://song-suggester.herokuapp.com/get_like?seed=${track_id || "0815epvZrVtP00ARbscMLt"}&num=${number_like || 100}`)
        .then(resp => {
            // console.log(resp.data)
            const song = resp.data
            return res.status(200).json(song);
        })
        .catch(err => res.status(500).json({error: err}))
})

// ---------- POST - send a song ID, get similar songs
/**
 * @api {post} /music/mood Get songs by audio feature
 * @apiVersion 0.1.0
 * @apiName Get songs by audio feature
 * @apiGroup Music
 * 
 * @apiParam {String} feature The audio feature you're requesting. Valid audio features: acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, valence, popularity.
 * @apiParam {String} value The value you want your feature to have. Acceptable values: high, medium, low. Used in the sense of "high danceability" or "low acousticness."
 * @apiParam {Number} [limit] By default, this endpoint will return 200 songs that match, but you can include this number to override that. Hard max of 500 songs.
 * 
 * @apiParamExample Example body:
 * {
 *	"feature": "acousticness",
 *	"value": "high",
 *	"limit": 100
 *  }
 * 
 * @apiSuccess {Object[]} song An array with all returned song objects, which each include tack info and audio features.
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
router.post('/mood', (req, res) => {
    const {feature, value, limit} = req.body
    console.log("mood:", feature, value)
    let min;
    let max;
    let totalLimit = limit

    function setValues(featureParam) {

        if (featureParam === "acousticness") {
            if (value === "high") {
                min = .64
                max = 1
            } else if (value === "medium") {
                min = .03
                max = .64
            } else {
                min = 0
                max = .03
            }
        } else if (featureParam === "danceability") {
            if (value === "high") {
                min = .73
                max = 1
            } else if (value === "medium") {
                min = .46
                max = .73
            } else {
                min = 0
                max = .46
            }
        } else if (featureParam === "energy") {
            if (value === "high") {
                min = .6
                max = 1
            } else if (value === "medium") {
                min = .4
                max = .6
            } else {
                min = 0
                max = .4
            }
        } else if (featureParam === "instrumentalness") {
            if (value === "high") {
                min = .88
                max = 1
            } else if (value === "medium") {
                min = .01
                max = .88
            } else {
                min = 0
                max = .01
            }
        } else if (featureParam === "liveness") {
            if (value === "high") {
                min = .24
                max = 1
            } else if (value === "medium") {
                min = .1
                max = .24
            } else {
                min = 0
                max = .1
            }
        } else if (featureParam === "loudness") {
            if (value === "high") {
                min = -5.68
                max = 1.81
            } else if (value === "medium") {
                min = -11.9
                max = -5.68
            } else {
                min = -60
                max = -11.9
            }
        } else if (featureParam === "speechiness") {
            if (value === "high") {
                min = .13
                max = 1
            } else if (value === "medium") {
                min = .04
                max = .13
            } else {
                min = 0
                max = .04
            }
        } else if (featureParam === "valence") {
            if (value === "high") {
                min = .64
                max = 1
            } else if (value === "medium") {
                min = .22
                max = .64
            } else {
                min = 0
                max = .22
            }
        } else if (featureParam === "popularity") {
            if (value === "high") {
                min = 38
                max = 100
            } else if (value === "medium") {
                min = 7
                max = 38
            } else {
                min = 0
                max = 7
            }
        } else {
            res.status(404).json({message: `Audio feature: ${feature} not found.`})
        }
        if (totalLimit > 500) {
            totalLimit = 500
        }
    }

    setValues(feature)
    axios.get(`https://song-suggester.herokuapp.com/get_range?audio_feature=${feature}&min=${ min }&max=${ max }&limit=${totalLimit || 200}`)
    .then(resp => {
        console.log(resp.data)
        const songs = resp.data
        return res.status(200).json(songs);
    })
    .catch(err => res.status(500).json({error: err}))
})


//////////////////////////////////////////////////////////////////////////
