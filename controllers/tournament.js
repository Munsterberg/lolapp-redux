var Tournament = require('../models/Tournament');

exports.showTournaments = function(req, res) {
  res.render('tournament/show', {
    title: 'Tournaments'
  });
};

exports.getRegister = function(req, res) {
  res.render('tournament/register', {
    title: 'Register for a Tournament'
  });
};

exports.postRegister = function(req, res) {
  var errors = req.validationErrors();
  
  if(errors) {
    req.flash('errors', errors);
    return res.redirect('/');
  }
  
  var tournament = new Tournament({
    teamname: req.body.teamname,
    teamcaptain: req.body.teamcaptain,
    playerTwo: req.body.playertwo,
    playerThree: req.body.playerthree,
    playerFour: req.body.playerfour,
    playerFive: req.body.playerfive,
    backupOne: req.body.backupone,
    backupTwo: req.body.backuptwo
  });
  
  tournament.save(function(err) {
    if(err) {
      req.flash('errors', { msg: 'You have already submitted a team, or one of your players is already on a registered team!' });
      return res.redirect('/tournaments');
    }
    // add an req.flash but a success message here
    res.redirect('/tournaments');
  });
};
