'use strict';
const {basename, extname} = require('path');
// this line is almost funny :)
const {pascalCase} = require('pascal-case');
const {getMethods} = require('../api-commands.js');

const getParamsDoc = details => {
  const seeDocs = details.args === 'see_docs';
  let doc = seeDocs ? ['See DreamHost documentation for parameters.', ''] : [];
  if (seeDocs ) {
    doc.push('@param {Object} [params]');
  } else {
    if (details.args.length) {
      doc.push('@param {Object} params');
    } else if (details.optargs.length) {
      doc.push('@param {Object} params');
    }
    doc = doc
        .concat(details.args.map(a => `@param {String} params.${a}`))
        .concat(details.optargs.map(a => `@param {String} [params.${a}]`));
  }

  return doc;
};

// todo: flesh this out a bit more
// checks for -list to avoid false_positives like commands like announcement_list-remove_subscriber
const getType = details => details.cmd.indexOf('-list') == -1 ? '' : '<Array>';

/**
 * takes each file in dist, determines the module from the filename,
 * then renames the internal class and fills in the appropriate methods and docs
 * @param {Object} file
 * @param {Object} api
 * @return {string|undefined}
 */
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
          p => j.identifier(className),
      );


  // replace the class body with a new one that contains all of the methods
  ast.find(j.ClassBody)
      .replaceWith(p => j.classBody(
          methodNames.map(methodName => {
            const details = apiCommands[methodName];

            // only give it a params argument if it might use it
            const acceptsParams = details.args === 'see_docs' || details.args.length || details.optargs.length;

            // this is a rather obtuse way of building a one-line method...
            const node = j.methodDefinition(
                'method',
                j.identifier(methodName),
                j.functionExpression(
                    null,
            acceptsParams ? [j.identifier('params')] : [],
            j.blockStatement([
              j.returnStatement(
                  j.callExpression(
                      j.memberExpression(
                          j.thisExpression(),
                          j.identifier('request'),
                      ), [
                        j.literal(details.cmd),
                      ].concat(
                    acceptsParams ? j.identifier('params') : [],
                      ),
                  ),
              ),
            ]),
                ),
            );

            // build up a nice jsdoc block
            const type = getType(details);
            node.comments = [j.commentBlock(
                '*' + [details.cmd, '']
                    .concat(getParamsDoc(details))
                    .concat(`@return {Promise${type}}\n`)
                    .map(line => line ? '\n* ' + line : '\n*') // make the eslint no-trailing-space rule happy
                    .join(''),
            )];

            return node;
          }),
      ));

  return ast.toSource({quote: 'single'});
}

module.exports = transformer;
