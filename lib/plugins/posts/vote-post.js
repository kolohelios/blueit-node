'use strict';

var Post = require('../../models/post');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'PUT',
    path: '/posts/{postId}/{direction}',
    config: {
      description: 'Put vote to a post',
      validate: {
        params: {
          postId: Joi.string().length(24),
          direction: Joi.string()
        }
      },
      handler: function(request, reply){
        Post.findById(request.params.postId, function(err, post){
          if(request.params.direction === 'up'){
            console.info('vote up');
            post.votes++;
            post.save();
          }else if(request.params.direction === 'down'){
            console.info('vote down');
            post.votes--;
            post.save();
          }else{
            return reply('Not a valid vote.').code(400);
          }
          post.save();
          return reply(post);
        });

      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'posts.vote'
};
