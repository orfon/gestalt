var common = require('./common');

var Store = exports.Store = function() {

   this.store = {};
   return this;
}

Store.prototype.get = function(key) {
   var target = this.store;
   var path = common.path(key);

   while (path.length > 0) {
      var key = path.shift();
      if (target && target.hasOwnProperty(key)) {
         target = target[key];
         continue;
      }
      return undefined;
   }
   return target;
}

Store.prototype.set = function(key, value) {
   var path = common.path(key);
   if (path.length === 0) {
      if (!value || typeof(value) !== 'object') {
         return false;
      } else {
         this.reset();
         this.store = value;
         return true;
      }
   }

   var target = this.store;
   while(path.length > 1) {
      key = path.shift();
      if (!target[key] || typeof(target[key]) !== 'object') {
         target[key] = {};
      }
      target = target[key];
   }
   key = path.shift();
   target[key] = value;
   return true;
}

// pass in key=null to merge at root
/** @ignore **/
Store.prototype.merge = function(key, value) {
   if (typeof(value) !== 'object' || Array.isArray(value) || value === null) {
      return this.set(key, value);
   }

   var fullKey = key;
   // if key is null, we should merge at top level;
   // so no need to scope into store
   if (key !== null) {
      var path = common.path(key);
      var target = this.store;
      while (path.length > 1) {
         var key = path.shift();
         if (!target[key]) {
            target[key] = {};
         }
         target = target[key];
      }
      key = path.shift();

      if (typeof(target[key]) !== 'object' || Array.isArray(target[key])) {
         target[key] = value;
         return true;
      }
   }

   return Object.keys(value).every(function(nested) {
      return this.merge(common.key(fullKey, nested), value[nested]);
   }, this);
};

Store.prototype.reset = function() {
   this.store = {};
   return true;
}

Store.prototype.clear = function(key) {

   var target = this.store;
   var value = target;
   var path = common.path(key);
   for (var i = 0; i <path.length -1; i++) {
      key = path[i];
      value = target[key];
      if (typeof(value) !== 'function' && typeof(value) !== 'object') {
         return false;
      }
      target = value;
   }
   key = path[i];
   delete target[key];
   return true;
}