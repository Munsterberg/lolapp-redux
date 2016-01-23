var mongoose = require('mongoose');

var tournamentSchema = new mongoose.Schema({
  teamname: {
    type: String,
    required: true,
    unique: true
  },
  teamcaptain: {
    type: String,
    required: true,
    unique: true
  },
  playerTwo: {
    type: String,
    required: true,
    unique: true
  },
  playerThree: {
    type: String,
    required: true,
    unique: true
  },
  playerFour: {
    type: String,
    required: true,
    unique: true
  },
  playerFive: {
    type: String,
    required: true,
    unique: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tournament', tournamentSchema);