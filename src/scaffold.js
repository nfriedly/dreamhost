'use strict';
const {resolve, join} = require('path');
const fs = require('fs');
const ejs = require('ejs');
const pascalCase = require('pascal-case'); // lol
const camelCase = require('camelcase');
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
  pkg.engines.node = '>=4';
  fs.writeFile(join(distDir, 'package.json'), JSON.stringify(pkg, null, 2), err =>
    err ? reject(err) : resolve(),
  );
});

const createReadme = () => new Promise((resolve, reject) => {
  ejs.renderFile(join(__dirname, 'template/README.md.ejs'), {
    api,
    pascalCase,
    camelCase,
  }, {
    cache: false, // no need
  }, (err, str) => {
    if (err) {
      return reject(err);
    }
    fs.writeFile(join(distDir, 'README.md'), str, err =>
      err ? reject(err) : resolve(),
    );
  });
});

const scaffold = () =>
  rimraf(distDir)
      .then(() => new Promise((resolve, reject) =>
        fs.mkdir(distDir, err =>
          err && reject(err) || resolve(),
        ),
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
  scaffold().catch(ex => {
    console.error(ex);
    process.exit(1);
  });
}
