const {resolve, join} = require('path');
const fs = require('fs');
const rimraf = require('rimraf-promise');
const api = require('./api-commands.js');

const distDir = resolve(__dirname, '../dist/');

const copyToDist = (src, dest) => new Promise((resolve, reject) => {
  fs.createReadStream(join(__dirname, src))
    .on('error', reject)
    .pipe(fs.createWriteStream(join(distDir, dest)))
    .on('error', reject)
    .on('close', resolve);
});

rimraf(distDir)
  .then(() => new Promise((resolve, reject) =>
    fs.mkdir(distDir, err =>
      err && reject(err) || resolve()
    )
  ))
  .then(() => Promise.all([
    copyToDist('base.js', 'base.js'),
    copyToDist('dreamhost-template.js', 'dreamhost.js'),
    ...api.getModules().map(m => copyToDist('module-template.js', m + '.js'))
  ]))
  .then(() => console.log('scaffolding coppied'))
  .catch(ex => {
    console.log(ex);
    process.exit(1);
  });
