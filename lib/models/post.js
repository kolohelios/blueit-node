'use strict';

var Mongoose = require('mongoose');

var postSchema = Mongoose.Schema({
  title: {type: String, required: true},
  url: {type: String, required: true},
  isImage: {type: Boolean, required: true},
  votes: {type: Number, default: 1},
  userId: {type: Mongoose.Schema.ObjectId, ref: 'User', required: true},
  comments: [{
    body: {type: String, required: true},
    userId: {type: Mongoose.Schema.ObjectId, ref: 'User', required: true},
    votes: {type: Number, default: 1}
  }],
  createdAt : {type: Date, required: true, default: Date.now}
});

var Post = Mongoose.model('Post', postSchema);
module.exports = Post;
