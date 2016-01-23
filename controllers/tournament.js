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
