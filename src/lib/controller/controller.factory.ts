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
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import * as inflection from 'inflection';
import * as customStrings from '../../utils/custom-strings';
import { normalizeToKebabOrSnakeCase } from '../../utils/formatting';
import {
  DeclarationOptions,
  ModuleDeclarator,
} from '../../utils/module.declarator';
import { ModuleFinder } from '../../utils/module.finder';
import { NameParser } from '../../utils/name.parser';
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { ControllerOptions } from './controller.schema';

const ELEMENT_METADATA = 'controllers';
const ELEMENT_TYPE = 'controller';

export function main(options: ControllerOptions): Rule {
  options = transform(options);
  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        mergeSourceRoot(options),
        mergeWith(generate(options)),
        addDeclarationToModule(options),
      ]),
    )(tree, context);
  };
}

function transform(options: ControllerOptions): ControllerOptions {
  const target = Object.assign({}, options);
  target.metadata = ELEMENT_METADATA;
  target.type = ELEMENT_TYPE;

  const location = new NameParser().parse(target);
  target.name = normalizeToKebabOrSnakeCase(location.name);
  target.path = normalizeToKebabOrSnakeCase(join(`/modules/${options.moduleName}` as Path, location.path));

  target.specFileSuffix = normalizeToKebabOrSnakeCase(
    options.specFileSuffix || 'spec',
  );

  target.path = target.flat
    ? target.path
    : join(target.path as Path, target.name);
  return target;
}

function generate(options: ControllerOptions) {
  return (context: SchematicContext) =>
    apply(url('./files'), [
      options.spec
        ? noop()
        : filter((path) => !path.endsWith(`.__specFileSuffix__.ts`)),
      template({
        ...strings,
        ...inflection,
        ...customStrings.generate(options.name),
        ...options,
      }),
      move(options.path),
    ])(context);
}

function addDeclarationToModule(options: ControllerOptions): Rule {
  return (tree: Tree) => {
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
    const declarator: ModuleDeclarator = new ModuleDeclarator();
    tree.overwrite(
      options.module,
      declarator.declare(content, options as DeclarationOptions),
    );
    return tree;
  };
}
