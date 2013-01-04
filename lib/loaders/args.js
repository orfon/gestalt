var $s = require('ringo/utils/strings');
var system = require('system');


/*

--option=value (alternative long option with value)

NOT SUPPORTED:
-a -b -c (multiple short options)
-abc (multiple short options combined into one)
-a value (short option with value)
-avalue (alternative short option with value)
--option value (long option with value)


*/

exports.load = function(validOptions) {
   var parsedOptions = {};

   for (var i = 0; i < system.args.length; i++) {
      var option = system.args[i];

      if (!$s.startsWith(option, '-')) {
         break;
      }
      var key,value;
      if ($s.startsWith(option, '--')) {
         if (option.indexOf('=') > -1) {
            [key, value] = option.split('=');
         } else {
            throw new Error('unsupported long option "' + option + '"')
         }
      }
      if (validOptions && validOptions.indexOf(key) > -1) {
         parsedOptions[key] = value;
      }
   }
   return parsedOptions;
}