
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('music').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('music').insert([
        {
          "track_id": "2fWgvpvay6JWLboUtfvitp",
          "track_name": "Magic",
          "artist_name": "Craig David",
          "acousticness": 0.0898,
          "danceability": 0.716,
          "duration_ms": 193001,
          "energy": 0.839,
          "instrumentalness": 0.00000336,
          "key": 10,
          "liveness": 0.0711,
          "loudness": -4.945,
          "mode": false,
          "speechiness": 0.0379,
          "tempo": 107.011,
          "time_signature": 4,
          "valence": 0.703,
          "popularity": 50
        },
        {
          "track_id": "01RV4oaMhx0RXhSWqLUSwV",
          "track_name": "Carta De Luto",
          "artist_name": "Los Alegres De Teran",
          "acousticness": 0.733,
          "danceability": 0.718,
          "duration_ms": 163161,
          "energy": 0.403,
          "instrumentalness": 0.0,
          "key": 5,
          "liveness": 0.0414,
          "loudness": -8.343,
          "mode": true,
          "speechiness": 0.0528,
          "tempo": 125.453,
          "time_signature": 4,
          "valence": 0.963,
          "popularity": 7
        },
        {
          "track_id": "0815epvZrVtP00ARbscMLt",
          "track_name": "Una Sola Caída",
          "artist_name": "Los Alegres De Teran",
          "acousticness": 0.797,
          "danceability": 0.564,
          "duration_ms": 169613,
          "energy": 0.43,
          "instrumentalness": 0.0,
          "key": 5,
          "liveness": 0.0367,
          "loudness": -8.195,
          "mode": true,
          "speechiness": 0.0619,
          "tempo": 158.606,
          "time_signature": 3,
          "valence": 0.823,
          "popularity": 25
        },
        {
          "track_id": "4eJ6xxhMkNjovi7w6qQMS9",
          "track_name": "Made For You",
          "artist_name": "Jake Owen",
          "acousticness": 0.762,
          "danceability": 0.541,
          "duration_ms": 238040,
          "energy": 0.452,
          "instrumentalness": 0.0000198,
          "key": 1,
          "liveness": 0.114,
          "loudness": -6.129,
          "mode": true,
          "speechiness": 0.0279,
          "tempo": 82.052,
          "time_signature": 4,
          "valence": 0.325,
          "popularity": 51
        },
        {
          "track_id": "5lzb11BOouSBDXxhTnTtpv",
          "track_name": "Call Me Sir",
          "artist_name": "Train",
          "acousticness": 0.214,
          "danceability": 0.522,
          "duration_ms": 216280,
          "energy": 0.755,
          "instrumentalness": 0.0,
          "key": 8,
          "liveness": 0.102,
          "loudness": -4.405,
          "mode": false,
          "speechiness": 0.0461,
          "tempo": 83.965,
          "time_signature": 4,
          "valence": 0.441,
          "popularity": 58
        },
        {
          "track_id": "2uv9aJKh9YAluF3iz2AmK4",
          "track_name": "Karma",
          "artist_name": "Summer Walker",
          "acousticness": 0.345,
          "danceability": 0.593,
          "duration_ms": 188907,
          "energy": 0.294,
          "instrumentalness": 0.0000203,
          "key": 1,
          "liveness": 0.287,
          "loudness": -10.072,
          "mode": false,
          "speechiness": 0.0499,
          "tempo": 113.847,
          "time_signature": 4,
          "valence": 0.152,
          "popularity": 52
        },
        {
          "track_id": "38ofGhTF7TlGS4HkM6e2VS",
          "track_name": "Por Siempre Mi Amor",
          "artist_name": "Banda Sinaloense MS de Sergio Lizárraga",
          "acousticness": 0.174,
          "danceability": 0.812,
          "duration_ms": 200173,
          "energy": 0.37,
          "instrumentalness": 0.0,
          "key": 8,
          "liveness": 0.123,
          "loudness": -6.505,
          "mode": true,
          "speechiness": 0.0376,
          "tempo": 124.938,
          "time_signature": 4,
          "valence": 0.744,
          "popularity": 70
        }
      ]);
    });
};
