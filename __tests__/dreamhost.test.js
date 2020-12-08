'use strict';

const assert = require('assert');
const DreamHost = require('../dist/dreamhost');

let dh;

// this key is the test account from https://help.dreamhost.com/hc/en-us/articles/217560167-API_overview#Implementation_notes
test('can create a new Dreamhost() instance', () => {
  dh = new DreamHost({key: '6SHU5P2HLDAYECUM'});
});

test('throws when missing a key', () => assert.throws(() => new DreamHost()));

test('correctly formats errors from dreamhost', () => new Promise(resolve => {
  new DreamHost({key: 'foo'}).dns.listRecords()
      .then(records => assert.fail(records))
      .catch(er => {
        assert(er instanceof Error, 'error is an error instance');
        assert(er.code, 'err.code is set');
        resolve();
      });
}),
);


test('submodule commands work', () => dh.dns.listRecords());
