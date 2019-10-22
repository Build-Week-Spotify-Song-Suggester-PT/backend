## This is the readme! It will have info about how to use this backend.

# Access the backend documentation at [https://songsight-api.herokuapp.com](https://songsight-api.herokuapp.com)

### Spotify Song Suggester
Build an app to enable users to browse and visualize audio features of over 116k Spotify songs.

#### MVP:
##### DS:
- Build a model to recommend songs based on similarity to user input (I like song x, here are n songs like it based on these similar features)
- Create visualizations using song data to highlight similarities and differences between recommendations.

##### Web:
- user registration/login flow
- User can save their favorite songs to their profile in the Web backend
- Once the user has their favorites saved the DS API can make suggestions based on the audio features of their favorites.
- User can request suggested songs based on what they are in the mood for ( acousticness, danceability, duration, energy, etc)
- User can edit and delete their favorites.

#### Stretch:
##### DS:
- Create animations of your visualizations
- Highlight commonalities across the X most popular songs in the dataset

##### Web:
- When the user has a large number of favorites, find a way to visualize the audio features the user likes the most in an attractive way.