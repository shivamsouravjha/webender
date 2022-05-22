const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema=  mongoose.Schema;

const reportSchema = new schema({
    started: {type :Boolean },
    creation: {type :Boolean },
    uploading : {type :Boolean},
    completed   : {type :Boolean },
    startedAt: {type :Date},
    completedAt: {type:Date},
    creationStartAt: {type :Date},
    creationCompletedAt: {type:Date},
    uploadingStartAt: {type :Date},
    uploadingCompletedAt: {type:Date},
    link: {type:String},
},{
    versionKey: false 
  });

reportSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Report',reportSchema);