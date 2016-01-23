exports.showTournaments = function(req, res) {
  res.render('tournament/show', {
    title: 'Tournaments'
  });
};
