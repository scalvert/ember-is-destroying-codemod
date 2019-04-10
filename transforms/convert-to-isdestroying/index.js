const { getParser } = require('codemod-cli').jscodeshift;
const { getOptions } = require('codemod-cli');

module.exports = function transformer(file, api) {
  const j = getParser(api);
  const root = j(file.source);

  const namedImports = ['isAlive', 'isDead'];

  const replacers = {
    isAlive: () => {
      return j.unaryExpression('!', replacers.isDead());
    },
    isDead: () => {
      return j.memberExpression(
        j.thisExpression(),
        j.identifier('isDestroying')
      );
    },
  };

  function findImportPath(names, path) {
    return root
      .find(j.ImportDeclaration, { source: { value: path } })
      .filter(p =>
        p.value.specifiers.find(
          sp =>
            sp.type === 'ImportSpecifier' &&
            names.some(name => name === sp.local.name)
        )
      );
  }

  function transform() {
    const lifecycleUtilsImports = findImportPath(
      namedImports,
      'shared/utils/lifecycle-utils'
    );

    if (lifecycleUtilsImports.size() > 0) {
      let importDeclaration = lifecycleUtilsImports.get(0).node;
      let i = importDeclaration.specifiers.length;

      while (i--) {
        let sp = importDeclaration.specifiers[i];

        if (namedImports.includes(sp.local.name)) {
          root
            .find(j.CallExpression, {
              callee: {
                type: 'Identifier',
                name: sp.local.name,
              },
            })
            .replaceWith(replacers[sp.local.name]);

          importDeclaration.specifiers.splice(i, 1);
        }
      }

      if (importDeclaration.specifiers.length === 0) {
        lifecycleUtilsImports.remove();
      }
    }
  }

  transform();

  return root.toSource();
};
