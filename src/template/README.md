# DreamHost API Client for Node.js

Complete API client for [DreamHost's][DreamHost] [API].

Ready for browser use if DreamHost ever enables CORS on their API.

## Prerequisites

You'll need a [DreamHost] account and an [API Key][API], and [Node.js] >= v4.

## Installation

    npm install --save dreamhost

## Usage

Create a complete instance

```js
const DreamHost = require('dreamhost');

const dreamHost = new Dreamhost({
  key: '<your api key>'
});

// dreamHost will be initialized with all modules available, e.g.
dreamHost.dns.listRecords({type: 'A')
  .then(records => console.log(records))
  .catch(err => console.error(err))
```

Or create an instance of an individual API module:

```js
const DNS = require('dreamhost/dns');

const dns = new DreamhostDNS({
  key: '<your api key>'
});

dns.listRecords({type: 'A')
  .then(records => console.log(records))
  .catch(err => console.error(err))
```

{apidoc}


[DreamHost]: https://www.dreamhost.com/r.cgi?225072
[API]: https://help.dreamhost.com/hc/en-us/sections/203903178-API-Application-Programming-Interface-
[Node.js]: https://nodejs.org/
