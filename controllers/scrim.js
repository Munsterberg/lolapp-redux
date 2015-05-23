var Scrim = require('../models/Scrim');

exports.getScrim = function(req, res) {
  res.render('scrim/scrim', {
    title: 'Scrim Finder'
  });
};