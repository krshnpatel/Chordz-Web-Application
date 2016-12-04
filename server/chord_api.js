// Handling the chord_api
var express = require('express');
var router = express.Router();

var Chord = require('./app/models/chord');

router.get('/chord', function(req, res) {
    Chord.find(function(err, chords) {
        if (err)
            return res.send(err);
            
        //console.log(chords);
        res.json(chords);
    });
});


/*router.put('/chord/:chord_id', function(req, res) {
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
});*/


router.post('/chord', function(req, res) {
    
    console.log(req.body);
    
    var chord = new Chord();
    chord.email = req.body.email;
    chord.title = req.body.title;
    chord.version = req.body.version;
    chord.chordDoc = req.body.chordDoc;
    chord.isPublic = req.body.isPublic;
    
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
        
        Chord.find({
        email: req.body.email, title: req.body.title, version: req.body.version }, function(err, chord)
        {
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
    
    /**/
});

router.get('/chord/:chord_id', function(req, res) {
    Chord.findById(req.params.chord_id, function(err, chord) {
        if (err)
            return res.send(err);
        
        res.json(chord);
    });
});

module.exports = router;