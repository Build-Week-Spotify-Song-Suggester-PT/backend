
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('account_to_music').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('account_to_music').insert([
          {account_id: 1, song_id: 1, real_track_id: "2fWgvpvay6JWLboUtfvitp"},
          {account_id: 2, song_id: 2, real_track_id: "01RV4oaMhx0RXhSWqLUSwV"},
          {account_id: 3, song_id: 3, real_track_id: "0815epvZrVtP00ARbscMLt"},
          {account_id: 4, song_id: 4, real_track_id: "4eJ6xxhMkNjovi7w6qQMS9"},
          {account_id: 1, song_id: 5, real_track_id: "5lzb11BOouSBDXxhTnTtpv"},
          {account_id: 2, song_id: 6, real_track_id: "2uv9aJKh9YAluF3iz2AmK4"},
          {account_id: 2, song_id: 7, real_track_id: "38ofGhTF7TlGS4HkM6e2VS"},
          {account_id: 3, song_id: 6, real_track_id: "2uv9aJKh9YAluF3iz2AmK4"},
          {account_id: 3, song_id: 3, real_track_id: "0815epvZrVtP00ARbscMLt"},
          {account_id: 4, song_id: 1, real_track_id: "2fWgvpvay6JWLboUtfvitp"},
          {account_id: 4, song_id: 2, real_track_id: "01RV4oaMhx0RXhSWqLUSwV"},
          {account_id: 3, song_id: 1, real_track_id: "2fWgvpvay6JWLboUtfvitp"},
          {account_id: 4, song_id: 5, real_track_id: "5lzb11BOouSBDXxhTnTtpv"},
        ]);
      });
  };
  