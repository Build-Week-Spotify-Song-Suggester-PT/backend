
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('accountToMusic').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('accountToMusic').insert([
        {account_id: 1, song_id: 1},
        {account_id: 2, song_id: 2},
        {account_id: 3, song_id: 3},
        {account_id: 4, song_id: 4},
        {account_id: 1, song_id: 5},
        {account_id: 2, song_id: 6},
        {account_id: 2, song_id: 7},
        {account_id: 3, song_id: 6},
        {account_id: 3, song_id: 3},
        {account_id: 4, song_id: 1},
        {account_id: 4, song_id: 2},
        {account_id: 3, song_id: 1},
        {account_id: 4, song_id: 5},
      ]);
    });
};
