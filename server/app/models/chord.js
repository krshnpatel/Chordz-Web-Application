var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ChordSchema   = new Schema({
    email: String,
    title: String,
    version: Number,
    chordDoc: String
});

module.exports = mongoose.model('Chord', ChordSchema);