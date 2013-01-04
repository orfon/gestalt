var fs = require('fs');
var io = require('io');

exports.load = function(filename) {
   if (!fs.exists(filename) || !fs.isFile(filename)) {
      throw new Error('Can not load "' + filename + '"; does not exist or not a file.');
   }
   var data = fs.open(filename);
   var jProps = new java.util.Properties();
   jProps.load(data.raw);
   var propObj = {};
   var propArray = jProps.entrySet().toArray();
   propArray.forEach(function(entry) {
      propObj[entry.getKey()] = entry.getValue();
   });
   return propObj;
}

