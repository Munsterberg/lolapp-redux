var mongoose = require('mongoose');

var scrimSchema = new mongoose.Schema({
  teamname: String,
  teamcaptain: String,
  region: String
});

module.exports = mongoose.model('Scrim', scrimSchema);