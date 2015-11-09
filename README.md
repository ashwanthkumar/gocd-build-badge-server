# gocd-build-badge-server

Simple NodeJS app to store your pipeline passed / failed status so that we could generate a build badge for your Private Github repos.

## Build Badges
Depending on the last known status of the pipeline you could get any of the following badges

<img src="https://raw.githubusercontent.com/ashwanthkumar/gocd-build-badge-server/master/doc/unknown.png" width="175">
<img src="https://raw.githubusercontent.com/ashwanthkumar/gocd-build-badge-server/master/doc/passed.png" width="175">
<img src="https://raw.githubusercontent.com/ashwanthkumar/gocd-build-badge-server/master/doc/failed.png" width="175">

## Dependencies
- NodeJS
- Redis (you need a verified account on Heroku for this)

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone git@github.com:ashwanthkumar/gocd-build-badge-server.git # or clone your own fork
$ cd gocd-build-badge-server
$ npm install
$ npm run dev
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ heroku addons:create heroku-redis:hobby-dev
$ git push heroku master
$ heroku open
```
