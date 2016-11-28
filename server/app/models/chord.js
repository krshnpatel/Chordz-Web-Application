var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ChordSchema   = new Schema({
    email: String,
    title: String,
    version: Number,
    lastUpdated: String,
    chordDoc: String,
    isPublic: Boolean
});

module.exports = mongoose.model('Chord', ChordSchema);