const mongoose = require('mongoose');


const Schema = mongoose.Schema;

// A model for the each user

const userSchema = new Schema({
  name: {type: String, unique: false, minlength: 3},
  //username: {type: String, unique: false, minlength: 3},
  password: {type: String, required: true, minlength: 5},
  email: {type: String, required: true, trim: true, unique: true}, 
  avi: { type: String },
  privateChats: [{type: Schema.ObjectId, ref: 'privatechat'}],
  groupChats: [{type: Schema.ObjectId, ref: 'groupchat'}],
  bio: { type: String },
  friends: [{type: Schema.ObjectId, ref:'user'}],
  }, {
  timestamps: true,
});
 
module.exports= mongoose.model('user', userSchema)

