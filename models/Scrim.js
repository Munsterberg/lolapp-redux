var mongoose = require('mongoose');

var scrimSchema = new mongoose.Schema({
  teamname: String,
  teamcaptain: {
    type: String,
    required: true,
    unique: true
  },
  region: String,
  created_at: {
    type: Date,
    default: Date.now,
    expires: 1800
  }
});

module.exports = mongoose.model('Scrim', scrimSchema);