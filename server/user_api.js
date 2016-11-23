// Handling the user_api
var express = require('express');
var router = express.Router();

var User = require('./app/models/user');
var bcrypt = require('bcrypt');
const saltRounds = 10;


router.get('/user', function(req, res) {
    User.find(function(err, users) {
        if (err)
            return res.send(err);
            
        res.json(users);
    });
});


router.post('/user', function(req, res) {
    
    var user = new User();      // create a new instance of the User model
    
    user.email = req.body.email;  // set the users name (comes from the request)
    var myPlaintextPassword = req.body.password;
    
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        if (err)
            console.log("error");
        else
        {
            user.password = hash;
            
            user.save(function(err) {
                if (err)
                    return res.send(err);
                
                res.json({ message: 'User created!' });
            });
        }
    });
});


router.post('/verifyUser', function(req, res) {
    
    var email = req.body.email;
    var password = req.body.password;
    
    User.find({email: email}, function (err, thisUser) {
        if (err)
            return res.send(err);
        else
        {
            bcrypt.compare(password, thisUser.password, function(err, result) {
                if (err)
                    return res.send(err);
                    
                return res.json(result);
            });
        }
    });
});


router.delete('/user/:user_id', function(req, res) {
    User.remove({
        _id: req.params.user_id
    }, function(err, user) {
        if (err)
            return res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});


router.get('/user/:user_id', function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        
        if (err)
            return res.send(err);
        
        res.json(user);
    });
});


router.put('/user/:user_id', function(req, res) {
    // use our user model to find the user we want
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            return res.send(err);

        user.password = req.body.password;  // update the users info

        // save the user
        user.save(function(err) {
            if (err)
                return res.send(err);

            res.json({ message: 'User updated!' });
        });
    });
});

module.exports = router;