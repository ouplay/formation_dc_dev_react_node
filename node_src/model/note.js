const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

module.exports.Note = mongoose.model('Note', {
    title: { type: String, required: true },
    content: String,
});