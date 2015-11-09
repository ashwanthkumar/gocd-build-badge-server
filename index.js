
var express = require('express');
var app = express();
var Redis = require('ioredis');
var bodyParser = require('body-parser');
var redis = new Redis(process.env.REDIS_URL || 6379);

var STATUS_CONV = {
  "passed": {
    "color": "green",
    "text": "Passed"
  },
  "failed": {
    "color": "red",
    "text": "Failed"
  }
}

app.use(bodyParser.json()); // for parsing application/json
app.set('port', (process.env.PORT || 5000));
app.set('etag', false); // Don't set ETags - to bypass Github Image caching

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.post('/status', function(request, response) {
  redis.set(request.body.pipeline, JSON.stringify(request.body));
  response.send({
    "response": "ok",
    "input": JSON.stringify(request.body)
  });
});

app.get('/badge/:pipeline', function(request, response) {
  redis.get(request.params.pipeline, function (err, result) {
    var r = {
      "color": "grey",
      "text": "Unknown"
    };
    if(result && !err) {
      pipelineStatus = JSON.parse(result);
      r = STATUS_CONV[pipelineStatus.status.toLowerCase()] || r;
    }
    response.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.header('Pragma', 'no-cache');
    response.header('Expires', '0');
    response.header('Content-Type', 'image/svg+xml');
    response.render('pages/badge.svg.ejs', {
        boundary: r.color || "grey",
        text: r.text || "Unknown",
        size: request.query.size || 20
      });
  });
});

app.get('/debug/:pipeline', function(request, response) {
  redis.get(request.params.pipeline, function (err, result) {
    if(err) {
      console.error(err);
      response.send(500);
    } else {
      response.json(result);
    }
  });  
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
