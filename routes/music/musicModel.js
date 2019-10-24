
/**
 * WORKING ON DELETE SAVED SONG ENDPOINT. May need to refactor saved song endpoint to accomodate a unique constraint on track ids. Currently the endpoint works but will delete ALL records that match, so if you save it twice, it will delete both. This is not optimal, but can be worked around.
 */

const db = require('../../database/dbConfig.js');
const axios = require('axios')

module.exports = {
    getSavedSongs,
    saveSong,
    deleteSongFromFaves
};

// DATABASE FUNCTIONS BELOW

function getSavedSongs(id) {
    return db('account_to_music')
        .select()
        .where({ "account_id": id })
        .join("music", "song_id", "music.id")
}

function saveSong(song, account_id, track_id) {
    return db('music')
        .insert(song)
        .returning('id')
        .then(ids => {
            // console.log("???", ids[0])
            return associateSongToAccount(ids[0], account_id, track_id)
        })
}

function findById(id) {
    return db('music')
        .where('id', id)
        .first();
}
function associateSongToAccount (song_id, account_id, track_id) {
    const association = { 
        account_id: account_id,
        song_id: song_id,
        real_track_id: track_id
    }
    return db('account_to_music')
        .insert(association)
        .returning('account_id')
}
function deleteSongFromFaves(account_id, track_id) {
    return db('account_to_music')
        // .join("music", "song_id", "track_id")
        .select()
        .where({account_id, real_track_id: track_id})
        .limit(1)
        .first()
        .del();
}