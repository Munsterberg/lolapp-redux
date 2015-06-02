/*
* GET Info Page
 */
exports.getInfoPage = function(req, res) {
  res.render('info', {
    title: 'Info'
  });
};