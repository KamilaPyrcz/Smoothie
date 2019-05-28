var express = require('express')

var routes = function(Email){
  var mainRouter = express.Router()
  
  mainRouter.route('/emails')


    .post(function (req, res) {        
    //http://localhost:8000/api/emails
        Email.create(req.body, function (err, em) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(200).json({status:"ok"});
            }
          });
    });

    return mainRouter;
};

module.exports = routes
