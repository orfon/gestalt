var assert = require("assert");

exports.testCommon = function() {
   var common = require('../lib/common');
   assert.deepEqual(common.path('foo:bar:baz'), ['foo', 'bar', 'baz']);
   assert.deepEqual(common.key('foo', 'bar', 'baz'), 'foo:bar:baz');
}

exports.testStore = function(){

   var {Store} = require('../lib/store');
   var store = new Store();

   // set returns true
   assert.isTrue(store.set('foo:bar:bazz', 'buzz'));
   assert.isTrue(store.set('falsy:number', 0));
   assert.isTrue(store.set('falsy:string:empty', ''));
   assert.isTrue(store.set('falsy:string:value', 'value'));
   assert.isTrue(store.set('falsy:boolean', false));
   assert.isTrue(store.set('falsy:object', null));

   // get returns value
   assert.equal(store.get('foo:bar:bazz'), 'buzz');
   assert.equal(store.get('falsy:number'), 0);
   assert.equal(store.get('falsy:string:empty'), '');
   assert.equal(store.get('falsy:string:value'), 'value');
   assert.equal(store.get('falsy:boolean'), false);
   assert.equal(store.get('falsy:object'), null);

   // non existing keys return undefined
   assert.equal(store.get('this:key:does:not:exist'), undefined);
   assert.equal(store.get('falsy:number:not:exist'), undefined);
   assert.equal(store.get('falsy:boolean:not:exist'), undefined);
   assert.equal(store.get('falsy:object:not:exist'), undefined);
   assert.equal(store.get('falsy:string:empty:not:exist'), undefined);
   assert.equal(store.get('falsy:string:value:not:exist'), undefined);

   // clear
   assert.equal(store.get('foo:bar:bazz'), 'buzz');
   assert.isTrue(store.clear('foo:bar:bazz'));
   assert.isTrue(typeof store.get('foo:bar:bazz') === 'undefined');

   // merge
   var merge = {
      prop1: 1,
      prop2: [1, 2, 3],
      prop3: {
         foo: 'bar',
         bar: 'foo'
      }
   };
   store.set('merge:literal', 'string-value');
   store.merge('merge:literal', merge);
   assert.deepEqual(store.get('merge:literal'), merge);

   // merge array
   store.set('merge:array', [1,2,3,4]);
   store.merge('merge:array', merge);
   assert.deepEqual(store.get('merge:literal'), merge);

   // merge object
   store.set('merge:object', {
    prop1: 2,
    prop2: 'prop2',
    prop3: {
      bazz: 'bazz'
    },
    prop4: ['foo', 'bar']
   });
   store.merge('merge:object', merge);

   assert.equal(store.get('merge:object:prop1'), 1);
   assert.equal(store.get('merge:object:prop2').length, 3);
   assert.deepEqual(store.get('merge:object:prop3'), {
    foo: 'bar',
    bar: 'foo',
    bazz: 'bazz'
   });
   assert.equal(store.get('merge:object:prop4').length, 2);
};

exports.testJsonFile = function() {
   var config = require('../lib/main').load(module.resolve('./fixture/test.json'));

   assert.isTrue(config.get('bar'));

   // try overwriting existing values
   var config = require('../lib/main').load(module.resolve('./fixture/test.json'));

   config.set('foo:bar', 'baz');
   assert.isTrue(config.get('bar'));
   assert.equal(config.get('foo:bar'), 'baz');
};

exports.testProperties = function() {
   var config = require('../lib/main').load(module.resolve('./fixture/test.properties'));

   assert.equal(config.get('xmlRpcUrl'), 'http://example.com');
   assert.equal(config.get('oewa.detail.sites'), 'true');
   assert.equal(config.get('oewa.detail.stories.days'), '7');
}

exports.testModule = function() {
   var config = require('../lib/main').load(module.resolve('./fixture/test.js'))
   assert.isTrue(config.get('foo:bar'))
   assert.equal(config.get('foo:zar:baz'), 123);
}

//start the test runner if we're called directly from command line
if (require.main == module.id) {
   var system = require('system');
   system.exit(require('test').run(exports, system.args[1]));
}