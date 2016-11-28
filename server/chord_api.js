// Handling the chord_api
var express = require('express');
var router = express.Router();

var Chord = require('./app/models/chord');

router.get('/chord', function(req, res) {
    Chord.find(function(err, chords) {
        if (err)
            return res.send(err);
            
        console.log(chords);
        res.json(chords);
    });
});


router.put('/chord/:chord_id', function(req, res) {
    // use our chord model to find the chord we want
    Chord.findById(req.params.chord_id, function(err, chord) {
        if (err)
            return res.send(err);
            
        chord.title = req.body.title;
        chord.version = req.body.version;
        chord.chordDoc = req.body.chordDoc;
        chord.isPublic = req.body.isPublic;
            
        var date = new Date();
        chord.lastUpdated = date.toLocaleString();

        // save the chord
        chord.save(function(err) {
            if (err)
                return res.send(err);
            
            res.json({ message: 'Chord updated!' });
        });
    });
});


router.post('/chord', function(req, res) {
    var chord = new Chord();      // create a new instance of the Bear model
    chord.email = req.body.email;  // set the bears name (comes from the request)
    chord.title = req.body.title;
    chord.version = req.body.version;
    chord.chordDoc = req.body.chordDoc;
    chord.isPublic = req.body.isPublic;
    
    var date = new Date();
    chord.lastUpdated = date.toLocaleString();
    
    console.log(chord);
    
    chord.save(function(err) {
        if (err)
            return res.send(err);
            
        res.json({ message: 'Chord created!' });
    });
});


router.put('/chord', function(req, res) {
    Chord.remove({ //_id: req.params.chord_id
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
});

router.get('/chord/:chord_id', function(req, res) {
    Chord.findById(req.params.chord_id, function(err, chord) {
        if (err)
            return res.send(err);
        
        res.json(chord);
    });
});

module.exports = router;