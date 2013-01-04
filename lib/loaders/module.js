var fs = require('fs');
var $o = require('ringo/utils/objects');

exports.load = function(moduleName) {
   var data = require(moduleName);
   // copy
   return $o.clone(data, {}, true);
}

