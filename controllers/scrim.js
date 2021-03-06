var Scrim = require('../models/Scrim');
var request = require('request');

exports.index = function(req, res) {
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
    return res.redirect('/');
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
  var parsedBody = {};
  var val = '';

  var craftUrl = function(region, teamcaptain, apiKey, callback) {
    url = 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/'
        + teamcaptain + '?api_key=' + apiKey;

    request(url, function(error, response, body) {
      if(!error && response.statusCode == 200) {
        parsedBody = JSON.parse(body);

        Object.keys(parsedBody).forEach(function(key) {
          val = parsedBody[key];
        });

        callback();
      } else {
        req.flash('errors', { msg: 'Your team captain\'s name was not found in the League of Legends database!' });
        return res.redirect('/');
      }
    });
  };

  craftUrl(region, teamcaptain, apiKey, function() {
    var teamCap = teamcaptain.toLowerCase();
    var valName = val.name.toLowerCase();

    if(teamCap == valName) {
      scrim.save(function(err) {
        if(err) {
          req.flash('errors', { msg: 'You have already created a post!' });
          return res.redirect('/');
        }
        res.redirect('/');
      });
    }
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

exports.getScrimError = function(req, res) {
  res.render('scrim/failscrim', {
    title: 'Post Failed',
  });
};
