'use strict';
const { basename, extname } = require('path');
const clone = require('clone');
// this line is almost funny :)
const pascalCase = require('pascal-case');
const {getMethods} = require('../api-commands.js');

const getParamsDoc = details => {
  const seeDocs = details.args === 'see_docs';
  let doc = seeDocs ? ['See DreamHost documentation for parameters.', ''] : [];
  doc.push('@param {Object} params');
  if (!seeDocs) {
    doc = doc
      .concat(details.args.map(a => `@param ${a}`))
      .concat(details.optargs.map(a => `@param [${a}]`))
  }
  return doc;
};


// takes each file in dist, determines the module from the filename, then renames the internal class and fills in the appropriate methods and docs
function transformer(file, api) {
  const j = api.jscodeshift;

  const dhModuleName = basename(file.path, extname(file.path));
  const className = pascalCase(dhModuleName);
  const apiCommands = getMethods(dhModuleName);

  if (!apiCommands) {
    // this code mod only cares about files who's name matches one of the modules in api-commands.json
    return;
  }

  const methodNames = Object.keys(apiCommands);

  const ast = j(file.source);

  ast.find(j.Identifier)
    .filter(p => p.value.name === 'ModuleName')
    .replaceWith(
      p => j.identifier(className)
    );


  // replace the class body with a new one that contains all of the methods
  ast.find(j.ClassBody)
    .replaceWith(p => j.classBody(
      methodNames.map(methodName => {
        const details = apiCommands[methodName];

        // this is a rather obtuse way of building a one-line method...
        const node = j.methodDefinition(
          "method",
          j.identifier(methodName),
          j.functionExpression(
            null,
            [j.identifier("params")],
            j.blockStatement([
              j.returnStatement(
                j.callExpression(
                  j.memberExpression(
                    j.thisExpression(),
                    j.identifier("request")
                  ), [
                    j.literal(details.cmd),
                    j.identifier("params")
                  ]
                )
              )
            ])
          )
        );

        // build up a nice jsdoc block
        node.comments = [j.commentBlock(
          ['*', details.cmd, '']
            .concat(getParamsDoc(details))
            .concat('@return {Promise<Object>}\n')
            .join('\n* ')
        )];

        return node;
      })
    ));

  return ast.toSource();
}

module.exports = transformer;
