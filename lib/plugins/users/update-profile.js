'use strict';

var User = require('../../models/user');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'PUT',
    path: '/profiles',
    config: {
      description: 'Update a user profile',
      validate: {
        payload: {
          avatar: Joi.string(),
          handle: Joi.string()
        }
      },
      handler: function(request, reply){
        User.findByIdAndUpdate(request.auth.credentials._id, request.payload, saveCb);

        function saveCb(err, user){
          if(err){
            reply(JSON.stringify(err).code(400));
          }else{
            return reply(user);
          }
        }
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'users.profile'
};
