'use strict';
const {basename} = require('path');
const {pascalCase} = require('pascal-case'); // lol
const camelCase = require('camelcase');
const {getModules} = require('../api-commands.js');

/**
 * takes each file in dist, determines the module from the filename,
 * then renames the internal class and fills in the appropriate methods and docs
 * @param {Object} file
 * @param {Object} api
 * @return {string|undefined}
 */
function transformer(file, api) {
  const j = api.jscodeshift;

  if (basename(file.path) !== 'dreamhost.js') {
    return;
  }

  const modules = getModules();

  const ast = j(file.source);

  // replace the base module require with a require statement for each actual module
  ast.find(j.VariableDeclaration)
      .filter(p =>
      // this is probably overly safe, but meh
        p.value.declarations &&
      p.value.declarations[0] &&
      p.value.declarations[0].init &&
      p.value.declarations[0].init.callee.name === 'require' &&
      p.value.declarations[0].init['arguments'] &&
      p.value.declarations[0].init['arguments'][0] &&
      p.value.declarations[0].init['arguments'][0].value === './base.js',
      )
      .replaceWith(() => modules.map(moduleName =>
        j.variableDeclaration(
            'const',
            [j.variableDeclarator(
                j.identifier(pascalCase(moduleName)),
                j.callExpression(
                    j.identifier('require'),
                    [j.literal('./' + moduleName)],
                ),
            )],
        ),
      ),
      );


  // initialize each module in the constructor
  ast.find(j.MethodDefinition)
      .filter(p => p.value.kind === 'constructor')
      .replaceWith(p => {
      // the block statement AKA the {} that wapps the body of the method
      // we're going to throw out and replace the body for now.
        const block = p.value.value.body;
        // this.moduleName = new ModuleName(options); - for each module
        block.body = modules.map(moduleName =>
          j.expressionStatement(
              j.assignmentExpression(
                  '=',
                  j.memberExpression(
                      j.thisExpression(),
                      j.identifier(camelCase(moduleName)),
                  ),
                  j.newExpression(
                      j.identifier(pascalCase(moduleName)),
                      [j.identifier('options')],
                  ),
              ),
          ),
        );
        return p.value;
      });

  // todo: re-export each module for convenience
  // jscodemod is usually pretty good about figuring out tab width, but it seems to get it wrong for the constructor's body now
  return ast.toSource({quote: 'single', tabWidth: 2});
}

module.exports = transformer;
