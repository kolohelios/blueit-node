'use strict';

var Post = require('../../models/post');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'PUT',
    path: '/posts/{postId}/comment/{commentId}/{direction}',
    config: {
      description: 'Put vote to a post',
      validate: {
        params: {
          postId: Joi.string().length(24),
          commentId: Joi.string().length(24),
          direction: Joi.string()
        }
      },
      handler: function(request, reply){
        Post.findOne({'_id': request.params.postId}, function(err, post){
          console.log(post.comments);
          var comment = post.comments.id(request.params.commentId);
          console.log(comment);
          if(request.params.direction === 'up'){
            console.info('vote up');
            comment.votes++;
            post.save();
          }else if(request.params.direction === 'down'){
            console.info('vote down');
            comment.votes--;
            post.save();
          }else{
            return reply('Not a valid vote.').code(400);
          }
          return reply(comment);
        });
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'posts.commentvote'
};
