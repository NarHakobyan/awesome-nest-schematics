import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  branchAndMerge,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { normalizeToKebabOrSnakeCase } from '../../utils/formatting';
import {
  DeclarationOptions,
  ModuleDeclarator,
} from '../../utils/module.declarator';
import { ModuleFinder } from '../../utils/module.finder';
import { NameParser } from '../../utils/name.parser';
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { ServiceOptions } from './query.schema';
import * as customStrings from '../../utils/custom-strings';

function isNullOrUndefined(value: any): value is null | undefined {
  return value === null || value === undefined;
}

export function main(options: ServiceOptions): Rule {
  options = transform(options);
  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        mergeSourceRoot(options),
        addDeclarationToModule(options),
        mergeWith(generate(options)),
      ]),
    )(tree, context);
  };
}

function transform(options: ServiceOptions): ServiceOptions {
  options = Object.assign({}, options);
  options.metadata = 'providers';
  options.type = 'handler';

  if (isNullOrUndefined(options.name)) {
    throw new SchematicsException('Option (name) is required.');
  }
  const location = new NameParser().parse(options);
  options.name = normalizeToKebabOrSnakeCase(location.name);
  options.path = normalizeToKebabOrSnakeCase(join(`/modules/${options.moduleName}` as Path, location.path, '/queries/' as Path));
  options.specFileSuffix = normalizeToKebabOrSnakeCase(
    options.specFileSuffix || 'spec',
  );

  options.path = options.flat
    ? options.path
    : join(options.path as Path, options.name);
  return options;
}

function generate(options: ServiceOptions) {
  return (context: SchematicContext) =>
    apply(url('./files'), [
      options.spec
        ? noop()
        : filter((path) => {
            return !path.endsWith(`.__specFileSuffix__.ts`)
        }),
      template({
        ...strings,
        ...options,
        ...customStrings.generate(options.name)
      }),
      move(options.path),
    ])(context);
}

function addDeclarationToModule(options: ServiceOptions): Rule {
  return (tree) => {
    if (options.skipImport !== undefined && options.skipImport) {
      return tree;
    }
    options.module = new ModuleFinder(tree).find({
      name: options.name,
      path: options.path as Path,
    });
    if (!options.module) {
      return tree;
    }
    const content = tree.read(options.module).toString();
    const declarator = new ModuleDeclarator();
    tree.overwrite(
      options.module,
      declarator.declare(content, options as DeclarationOptions),
    );
    return tree;
  };
}
