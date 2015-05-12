'use strict';

var Post = require('../../models/post');
var User = require('../../models/user');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/posts/{postId?}',
    config: {
      description: 'Fetch all posts or one post',
      },
      handler: function(request, reply){
        if(request.params.postId){
          Post.findById(request.params.postId, function(err, post){
            User.findById(post.userId, function(err, user){
              var returnPost = post.toJSON();
              returnPost.handle = user.handle;
              return reply(returnPost);
            });
          });
        }else{
          Post.find({}, function(err, posts){
            return reply(posts);
          });
        }
      }
    });
  return next();
};

exports.register.attributes = {
  name: 'posts.fetch'
};
