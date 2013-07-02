var gestalt = require('./main');

exports.middleware = function(next, app) {
   var config = gestalt.load();

   app.gestalt = {
      load: function() {
         config.reset();
         return config.merge.apply(config, arguments);
      },
      merge: function() {
         return config.merge.apply(config, arguments);
      },
      get: function() {
         return config.get.apply(config, arguments);
      }
   }
   // we don't add any middleware
   return next;
}