import { normalize } from '@angular-devkit/core';
import { apply, applyTemplates, chain, mergeWith, move, Rule, SchematicContext, strings, Tree, url } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function helloWorld(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    if (options.path === undefined) {
      options.path = `/src/features`;
    }

    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: capitalizeFirstLetter(options.name || 'test')
      }),
      move(normalize(options.path as string))
    ]);



    return chain([
      mergeWith(templateSource)
    ]);
  };
}

function capitalizeFirstLetter(test:string) {
  return test.charAt(0).toUpperCase() + test.slice(1);
}


