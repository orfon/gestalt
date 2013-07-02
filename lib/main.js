var {Store} = require('./store');

var LOADERS = {
   '.json': require('./loaders/json'),
   '.properties': require('./loaders/properties'),
   '.js': require('./loaders/module')
};

var Gestalt = function() {

   var store = new Store();

   this.get = function(key) {
      return store.get(key);
   };
   this.set = function(key, value) {
      return store.set(key, value);
   }
   this.reset = function() {
      return store.reset();
   }
   this.merge = function() {
      var args = Array.prototype.slice.call(arguments);
      var key = args[0];
      var filename = args[1];
      if (args.length === 1) {
         key = null;
         filename = args[0];
      }
      var ending = require('fs').extension(filename);
      return store.merge(key, LOADERS[ending].load(filename));
   };

   return this;
};


exports.load = function() {
   var gestalt = new Gestalt();
   gestalt.merge.apply(gestalt, arguments);
   return gestalt;
};
