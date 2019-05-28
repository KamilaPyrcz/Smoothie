var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var emailModel = new Schema(
    {
        address: { type: String },
    },
    { collection: 'emails' });

module.exports = mongoose.model('Email', emailModel);