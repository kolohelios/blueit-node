'use strict';

var User = require('../../models/user');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/profiles',
    config: {
      description: 'Fetch a user profile',
      },
      handler: function(request, reply){
        console.info(request.auth.credentials._id);
        User.findById(request.auth.credentials._id, function(err, user){
          return reply(user);
        });

        }
      });

  return next();
};

exports.register.attributes = {
  name: 'users.fetch'
};
