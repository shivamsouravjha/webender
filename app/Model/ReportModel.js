import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const schema=  mongoose.Schema;

const reportSchema = new schema({
    status: {type :String },
    errorstage: {type :String },
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

reportSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Report',reportSchema);
