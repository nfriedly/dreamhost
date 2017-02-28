'use strict';
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

const createPackageJSON = () => new Promise((resolve, reject) => {
  const pkg = require('../package.json');
  delete pkg.private;
  delete pkg['//note'];
  pkg.name = 'dreamhost';
  fs.writeFile(join(distDir, 'package.json'), JSON.stringify(pkg, null, 2), err =>
    err ? reject(err) : resolve()
  );
});

const createReadme = () => new Promise((resolve, reject) => {
  fs.readFile(join(__dirname, 'template/README.md'), (err, body) => {
    if (err) {
      return reject(err);
    }
    // todo: fill in api docs
    const apidocs = '';
    body = body.toString().replace('{apidoc}', apidocs);
    fs.writeFile(join(distDir, 'README.md'), body, err =>
      err ? reject(err) : resolve()
    );
  });
});

const scaffold = () =>
  rimraf(distDir)
    .then(() => new Promise((resolve, reject) =>
      fs.mkdir(distDir, err =>
        err && reject(err) || resolve()
      )
    ))
    .then(() => Promise.all([
      createReadme(),
      copyToDist('template/base.js', 'base.js'),
      copyToDist('template/dreamhost.js', 'dreamhost.js'),
      createPackageJSON(),
      ...api.getModules().map(m => copyToDist('template/module.js', m + '.js')),
    ]))
    .then(() => console.log('scaffolding copied'));

module.exports = {
  copyToDist,
  scaffold,
  createReadme,
};

if (require.main === module) {
  scaffold();
}
