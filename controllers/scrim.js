var Scrim = require('../models/Scrim');
var request = require('request');

exports.getScrim = function(req, res) {
  Scrim.find({}).sort('-created_at').exec(function(err, scrims) {
    if(err) throw(err);

    res.render('scrim/scrim', {
      title: 'Scrim Finder',
      teams: scrims
    });
  });
};

exports.getPostScrim = function(req, res) {
  res.render('scrim/postscrim', {
    title: 'Post a Scrim'
  });
};

exports.postPostScrim = function(req, res) {
  var errors = req.validationErrors();

  if(errors) {
    req.flash('errors', errors);
    return res.redirect('/scrim');
  }

  var scrim = new Scrim({
    teamname: req.body.teamname,
    teamcaptain: req.body.teamcaptain,
    region: req.body.region
  });

  var region = req.body.region;
  var teamcaptain = req.body.teamcaptain;
  var apiKey = 'c90e16ea-74ce-4e96-8a3b-d8a4ba3449fa';
  var url = '';

  craftUrl = function(region, teamcaptain, apiKey) {
    url = 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/'
    + teamcaptain + '?api_key=' + apiKey;

    request(url, function(error, response, body) {
      if(!error && response.statusCode == 200) {
        var parsedBody = JSON.parse(body);

        Object.keys(parsedBody).forEach(function(key) {
          var val = parsedBody[key];
          console.log(val.name);
        });


        //console.log(parsedBody);
        //console.log(parsedBody.itch.name)
      }
    });
  };


  scrim.save(function(err) {
    craftUrl(region, teamcaptain, apiKey);
    if(err) {
      return next(err);
    }
    res.redirect('/scrim');
  });
};

exports.getShowScrim = function(req, res) {
  Scrim.findById(req.params.id, function(err, scrim) {
    if(err) throw err;

    res.render('scrim/show', {
      title: 'Scrim',
      team: scrim
    });
  });
};
