var fs = require('fs');

exports.load = function(filename) {
   if (!fs.exists(filename) || !fs.isFile(filename)) {
      throw new Error('Can not load "' + filename + '"; does not exist or not a file.');
   }
   var data = fs.read(filename);
   return JSON.parse(data);
}

