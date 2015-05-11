'use strict';

var Post = require('../../models/post');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'POST',
    path: '/posts',
    config: {
      description: 'Create a post',
      validate: {
        payload: {
          title: Joi.string().min(5).max(255),
          url: Joi.string().uri(),
          isImage: Joi.bool()
        }
      },
      handler: function(request, reply){
        var post = new Post(request.payload);
        post.userId = request.auth.credentials._id;
        post.save(function(){
          return reply(post);
        });
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'posts.create'
};
