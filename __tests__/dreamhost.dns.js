'use strict';

const assert = require('assert');
const DreamHost = require('../dist/dreamhost');

const dh = new DreamHost({key: '6SHU5P2HLDAYECUM'});

test('can list dns records', () =>
  dh.dns.listRecords()
      .then(records => {
        assert(records);
        assert(Array.isArray(records));
      }),
);
