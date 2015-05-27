var Scrim = require('../models/Scrim');

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

  scrim.save(function(err) {
    if(err) {
      return next(err);
    }
    res.redirect('/scrim');
  });
};

exports.getShowScrim = function(req, res) {
  Scrim.findById(req.params.id, function(err, scrim) {
    if(err) throw err;

    console.log(scrim);

    res.render('scrim/show', {
      title: 'Scrim',
      team: scrim
    });
  });
};
