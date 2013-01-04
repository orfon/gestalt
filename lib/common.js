exports.path = function(key) {
   return key == null ? [] : key.split(':');
}

exports.key = function() {
   var args = Array.prototype.slice.call(arguments).filter(function(arg) {
      return arg !== undefined && arg !== null;
   });
   return Array.prototype.slice.call(args).join(':');
}
