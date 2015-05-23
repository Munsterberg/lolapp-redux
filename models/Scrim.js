var mongoose = require('mongoose');

var scrimSchema = new mongoose.Schema({
  teamname: String,
  teamcaptain: String,
  region: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scrim', scrimSchema);