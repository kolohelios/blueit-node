'use strict';

var Post = require('../../models/post');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'PUT',
    path: '/posts/{postId}/comment',
    config: {
      description: 'Create a comment',
      validate: {
        payload: {
          body: Joi.string().max(255)
        },
        params: {
          postId: Joi.string().length(24)
        }
      },
      handler: function(request, reply){
        console.log(request.payload);
        var comment = request.payload;

        comment.userId = request.auth.credentials._id;
        Post.findByIdAndUpdate(request.params.postId, {$push: {'comments': comment}}, function(err, result){
          return reply(comment);
        });
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'posts.createcomment'
};
