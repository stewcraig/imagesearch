# Image search abstraction microservice

Node.js app that provides details of image search results (e.g., URL, snippet, thumbnail URL and context URL).

App uses Google API for image search.

## Use

Instructions below detail how to get app running on Heroku. To do this you will need to have Heroku installed ([instructions here](https://devcenter.heroku.com/articles/heroku-cli)). Then:

1. Clone this repo into a directory.  
```
git clone  https://github.com/stewcraig/imagesearch.git
```

2. In that directory, create the app:
```
heroku create NAME_OF_APP
```

3. Push to the app with:
```
git push heroku master
```

4. Set up new MongoDB database (e.g., using [mLab](https://mlab.com) or other service)


5. Set database URI (where DATABASE_URI is URI of the database set up in step 4, e.g., MongoDB URI provided by mLab)

```
heroku config:set MONGOLAB_URI=DATABASE_URI
```