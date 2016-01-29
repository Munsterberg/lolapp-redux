var Tournament = require('../models/Tournament');

exports.showTournaments = function(req, res) {  
  Tournament.find({}, function(err, teams) {
    if(err) {
      console.log('Error retrieving teams!');
    }
    if(teams.length >= 16) {
      var fullTournmanet = true;
    }
   
    res.render('tournament/show', {
      title:'Tournaments',
      fullTournament: fullTournmanet
    });
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
  
  Tournament.find({}, function(err, teams) {
    if(err) {
      console.log('Error retrieving teams!');
    }
    if(teams.length >= 16) {
      var fullTournmanet = true;
    } 
    
    if(!fullTournmanet) {
      tournament.save(function(err) {
        if(err) {
          console.log(err);
          req.flash('errors', { msg: 'You have already submitted a team, or one of your players is already on a registered team! Please try again.' });
          return res.redirect('/tournaments');
        }
        // add an req.flash but a success message here
        res.redirect('/tournaments');
      });
    } else if(fullTournmanet == true) {
      req.flash('errors', { msg: 'This tournament is already full. Please register for a new tournament.' });
      return res.redirect('/tournaments');
    }
  });
};
