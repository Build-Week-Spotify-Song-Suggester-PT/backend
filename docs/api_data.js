define({ "api": [
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
          "content": "{\n\t\"name\": \"Janet\",\n\t\"email\": \"cactus@wikipedia.org\",\n\t\"password\": \"themoreyouknow\"\n}",
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
          "content": " HTTP/1.1 201 OK\n{\n  \"id\": 8,\n  \"name\": \"Janet\",\n  \"email\": \"cactus@wikipedia.org\",\n  \"token\": \"a really long string of letters and numbers, separated by dots\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/account/accountsRouter.js",
    "groupTitle": "Accounts"
  }
] });
