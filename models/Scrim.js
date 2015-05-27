var mongoose = require('mongoose');

var scrimSchema = new mongoose.Schema({
  teamname: String,
  teamcaptain: String,
  region: String,
  created_at: {
    type: Date,
    default: Date.now,
    expires: 1800
  }
});

module.exports = mongoose.model('Scrim', scrimSchema);