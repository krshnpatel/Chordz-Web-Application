// Handling the chord_api
var express = require('express');
var router = express.Router();

var validator = require('validator');

var Chord = require('./app/models/chord');

router.get('/chord', function(req, res) {
    
    Chord.find(function(err, chords) {
        if (err)
            return res.send(err);

        res.json(chords);
    });
    
});

router.post('/chord', function(req, res) {
    
    console.log(req.body);
    
    var chord = new Chord();
    chord.email = req.body.email;
    chord.title = req.body.title;
    chord.version = req.body.version;
    chord.chordDoc = req.body.chordDoc;
    chord.isPublic = req.body.isPublic;

    chord.chordDoc = validator.unescape(chord.chordDoc);
    
    var date = new Date();
    chord.lastUpdated = date.toLocaleString();
    
    Chord.find( { $and: [{'chordDoc': chord.chordDoc} , {'isPublic': true} , {'email': {$ne: chord.email} } ] }, function(err, foundChord) {
        
        if (err)
        {
            console.log("error");
            return res.send(err);
        }
        else if (foundChord.length > 0)
        {
            res.json({message: false});
        }
        else
        {
            chord.save(function(err) {
                if (err)
                    return res.send(err);
                    
                res.json({message: true});
            });
        }
        
    });
});


router.put('/chord', function(req, res) {
    
    if (req.body.isDelete)
    {
        console.log("delete");
        
        Chord.remove({
        email: req.body.email, title: req.body.title, version: req.body.version }, function(err, chord)
        {
            if (err || chord.length == 0)
            {
                console.log("error");
                return res.send(err);
            }
            else
            {
                res.json({ message: 'Successfully deleted' });
            }
        });
    }
    else
    {
        console.log("not delete");
        console.log(req.body.email + " -- " + req.body.title + " -- " + req.body.version + " -- " + req.body.isPublic + " -- " + req.body.newTitle);
        
        Chord.find({ email: req.body.email, title: req.body.title, version: req.body.version }, function(err, chord) {
            
            if (err || chord.length == 0)
            {
                console.log("error");
                return res.send(err);
            }
            else
            {
                chord[0].isPublic = req.body.isPublic;
                chord[0].title = req.body.newTitle;
                
                if (req.body.chordDoc)
                {
                    console.log("changing chordDoc");
                    chord[0].chordDoc = req.body.chordDoc;
                }
                else
                {
                    console.log("ignored changing chordDoc");
                }
                
                var date = new Date();
                chord[0].lastUpdated = date.toLocaleString();
                
                chord[0].save(function(err)
                {
                    if (err)
                    {
                        console.log("error!!!");
                        return res.send(err);
                    }
    
                    res.json({ message: 'Successfully edited' });
                });
            }
        });
    }
});

module.exports = router;