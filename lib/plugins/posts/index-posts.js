'use strict';

var Post = require('../../models/post');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/posts/{postId?}',
    config: {
      description: 'Fetch all posts',
      },
      handler: function(request, reply){
        if(request.params.postId){
          Post.findById(request.params.postId, function(err, post){
            return reply(post);
          });
        }
        Post.find({}, function(err, posts){
          return reply(posts);
        });
      }
    });
  return next();
};

exports.register.attributes = {
  name: 'posts.fetch'
};
