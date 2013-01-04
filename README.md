Configuration library for Ringojs

Overview
==========

  * supports loading configs from json, system arguments and java properties files
  * merge multiple config sources
  * plenty of unit tests

Example
===========

    var config = require('gestalt').load('/tmp/config.json');
    config.get('foo:bar');
    // manually set values
    config.set('database', {host: '127.0.0.1', port: 5984});
    config.get('database:host');

    // you can merge in several config files
    config.merge('/tmp/config.properties')

    // optionally the files can be merged into the
    // config hierarchy at a certain point
    config.merge('db', '/tmp/db.json');

inspired by https://github.com/flatiron/nconf and https://github.com/typesafehub/config