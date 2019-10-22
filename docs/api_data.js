define({ "api": [
  {
    "type": "delete",
    "url": "/accounts/:id",
    "title": "Delete account (WIP)",
    "version": "0.1.0",
    "name": "Delete_account",
    "group": "Accounts",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>A &quot;sorry to see you go&quot; goodbye message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful response: ",
          "content": " HTTP/1.1 200 OK\n{\n   \"message\": \"We're sorry to see you go!\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/account/accountsRouter.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "get",
    "url": "/accounts/:id/favorites",
    "title": "Get all songs saved to favorites",
    "version": "0.1.0",
    "name": "Get_account_info",
    "group": "Accounts",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Objects[]",
            "optional": false,
            "field": "favorites",
            "description": "<p>An array containing all the user's saved songs. Each object in the array is a single song with a list of all its audio attributes.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful response: ",
          "content": " HTTP/1.1 200 OK\n{\n   [\n      {\n        \"track_id\": \"2fWgvpvay6JWLboUtfvitp\",\n         \"track_name\": \"Magic\",\n         \"artist_name\": \"Craig David\",\n         \"acousticness\": 0.0898,\n         \"danceability\": 0.716,\n         \"duration_ms\": 193001,\n         \"energy\": 0.839,\n         \"instrumentalness\": 0.00000336,\n         \"key\": 10,\n         \"liveness\": 0.0711,\n         \"loudness\": -4.945,\n         \"mode\": false,\n         \"speechiness\": 0.0379,\n         \"tempo\": 107.011,\n         \"time_signature\": 4,\n         \"valence\": 0.703,\n         \"popularity\": 50\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/account/accountsRouter.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "post",
    "url": "/accounts/login",
    "title": "Log in to account",
    "version": "0.1.0",
    "name": "Login",
    "group": "Accounts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User's unique account ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "welcome",
            "description": "<p>Welcome message that includes the user's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Login token generated for the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful response: ",
          "content": " HTTP/1.1 200 OK\n{\n  \"message\": \"Welcome, Tahani!\"\n  \"token\": \"a really long string of letters and numbers, separated by dots\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/account/accountsRouter.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "post",
    "url": "/accounts/register",
    "title": "Register account",
    "version": "0.1.0",
    "name": "Register",
    "group": "Accounts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name or preferred display name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email, must be unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example body:",
          "content": "{\n\t\"name\": \"Chidi\",\n\t\"email\": \"c.anagonye@stjohns.edu\",\n\t\"password\": \"trolleyproblem\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Account id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Login token generated for the user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful response: ",
          "content": " HTTP/1.1 201 OK\n{\n  \"id\": 8,\n  \"name\": \"Chidi\",\n  \"email\": \"c.anagonye@stjohns.edu\",\n  \"token\": \"a really long string of letters and numbers, separated by dots\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/account/accountsRouter.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "delete",
    "url": "/music/",
    "title": "Delete a song from favorites (WIP)",
    "version": "0.1.0",
    "name": "Delete_a_song",
    "group": "Music",
    "filename": "routes/music/musicRouter.js",
    "groupTitle": "Music"
  },
  {
    "type": "post",
    "url": "/music/save",
    "title": "Register account",
    "version": "0.1.0",
    "name": "Save_song",
    "group": "Music",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "track_id",
            "description": "<p>The spotify track_id unique to each song.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example body:",
          "content": "{\n\t\"track_id\": \"5lzb11BOouSBDXxhTnTtpv\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>A message indicating the song was successfully saved to favorites list.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful response: ",
          "content": " HTTP/1.1 201 OK\n{\n  \"message\": \"Song saved to favorites.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/music/musicRouter.js",
    "groupTitle": "Music"
  },
  {
    "type": "post",
    "url": "/music/similar",
    "title": "Get similar songs",
    "version": "0.1.0",
    "name": "Similar_songs",
    "group": "Music",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "track_id",
            "description": "<p>The spotify track_id unique to each song.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "number",
            "description": "<p>_like The number of songs you'd like returned. Defaults to 100 similar songs.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example body:",
          "content": "{\n\t\"track_id\": \"5lzb11BOouSBDXxhTnTtpv\",\n \"number_like\": 2\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "song",
            "description": "<p>An object that contains all the song info, including all audio features.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful response: ",
          "content": " HTTP/1.1 200 OK\n[\n  {\n   \"track_id\": \"2fWgvpvay6JWLboUtfvitp\",\n   \"track_name\": \"Magic\",\n   \"artist_name\": \"Craig David\",\n   \"acousticness\": 0.0898,\n   \"danceability\": 0.716,\n   \"duration_ms\": 193001,\n   \"energy\": 0.839,\n   \"instrumentalness\": 0.00000336,\n   \"key\": 10,\n   \"liveness\": 0.0711,\n   \"loudness\": -4.945,\n   \"mode\": false,\n   \"speechiness\": 0.0379,\n   \"tempo\": 107.011,\n   \"time_signature\": 4,\n   \"valence\": 0.703,\n   \"popularity\": 50\n  }, {\n   \"track_id\": \"01RV4oaMhx0RXhSWqLUSwV\",\n   \"track_name\": \"Carta De Luto\",\n   \"artist_name\": \"Los Alegres De Teran\",\n   \"acousticness\": 0.733,\n   \"danceability\": 0.718,\n   \"duration_ms\": 163161,\n   \"energy\": 0.403,\n   \"instrumentalness\": 0.0,\n   \"key\": 5,\n   \"liveness\": 0.0414,\n   \"loudness\": -8.343,\n   \"mode\": true,\n   \"speechiness\": 0.0528,\n   \"tempo\": 125.453,\n   \"time_signature\": 4,\n   \"valence\": 0.963,\n   \"popularity\": 7    \n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/music/musicRouter.js",
    "groupTitle": "Music"
  },
  {
    "type": "post",
    "url": "/music/singletrack",
    "title": "Get single song audio features",
    "version": "0.1.0",
    "name": "Single_song_audio_features",
    "group": "Music",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "track_id",
            "description": "<p>The spotify track_id unique to each song.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example body:",
          "content": "{\n\t\"track_id\": \"5lzb11BOouSBDXxhTnTtpv\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "song",
            "description": "<p>An object that contains all the song info, including all audio features.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Successful response: ",
          "content": " HTTP/1.1 200 OK\n{\n\"track_id\": \"2fWgvpvay6JWLboUtfvitp\",\n \"track_name\": \"Magic\",\n \"artist_name\": \"Craig David\",\n \"acousticness\": 0.0898,\n \"danceability\": 0.716,\n \"duration_ms\": 193001,\n \"energy\": 0.839,\n \"instrumentalness\": 0.00000336,\n \"key\": 10,\n \"liveness\": 0.0711,\n \"loudness\": -4.945,\n \"mode\": false,\n \"speechiness\": 0.0379,\n \"tempo\": 107.011,\n \"time_signature\": 4,\n \"valence\": 0.703,\n \"popularity\": 50\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/music/musicRouter.js",
    "groupTitle": "Music"
  }
] });
