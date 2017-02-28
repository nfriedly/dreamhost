'use strict';

// parses the api-commands.json and makes lists of modules and methods available

const camelcase = require('camelcase');

// generate this file by calling https://api.dreamhost.com/?cmd=api-list_accessible_cmds&key=<YOUR API KEY>&format=json
// the key must have access to all api commands in order to build a complete dist
const apiCommands = require('./api-commands.json').data;

// organize the api commands by moduleName and then commandName
const modules = {};
apiCommands.forEach(command => {
  const parts = command.cmd.split('-');
  const module = parts.shift();
  const methodName = camelcase(parts.join('-'));
  modules[module] = modules[module] || {};
  modules[module][methodName] = command;
});

exports.getModules = () => Object.keys(modules);
exports.getMethods = moduleName => modules[moduleName];
