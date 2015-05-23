var Scrim = require('../models/Scrim');

exports.getScrim = function(req, res) {
  res.render('scrim/scrim', {
    title: 'Scrim Finder'
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
