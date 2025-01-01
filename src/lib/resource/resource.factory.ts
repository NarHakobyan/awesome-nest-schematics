import { join, Path, strings } from '@angular-devkit/core';
import * as customStrings from '../../utils/custom-strings';
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
  Source,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { DeclarationOptions, ModuleDeclarator, ModuleFinder } from '../..';
import {
  getPackageJsonDependency,
} from '../../utils/dependencies.utils';
import { normalizeToKebabOrSnakeCase } from '../../utils/formatting';
import { NameParser } from '../../utils/name.parser';
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { ResourceOptions } from './resource.schema';
import * as inflection from 'inflection';

export function main(options: ResourceOptions): Rule {
  options = transform(options);

  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        addMappedTypesDependencyIfApplies(options),
        mergeSourceRoot(options),
        addDeclarationToModule(options),
        mergeWith(generate(options)),
      ]),
    )(tree, context);
  };
}

function transform(options: ResourceOptions): ResourceOptions {
  const target: ResourceOptions = Object.assign({}, options);
  if (!target.name) {
    throw new SchematicsException('Option (name) is required.');
  }
  target.metadata = 'imports';

  const location = new NameParser().parse(target);
  target.name = normalizeToKebabOrSnakeCase(inflection.pluralize(location.name));
  target.path = normalizeToKebabOrSnakeCase(join('/modules/' as Path, location.path));

  target.specFileSuffix = normalizeToKebabOrSnakeCase(
    options.specFileSuffix || 'spec',
  );

  target.path = target.flat
    ? target.path
    : join(target.path as Path, target.name);
  target.isSwaggerInstalled = !!options.isSwaggerInstalled;

  return target;
}

function generate(options: ResourceOptions): Source {
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
        ...customStrings.generate(options.name),
      }),
      move(options.path),
    ])(context);
}

function addDeclarationToModule(options: ResourceOptions): Rule {
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
    const declarator = new ModuleDeclarator();
    tree.overwrite(
      options.module,
      declarator.declare(content, {
        ...options,
        name: inflection.singularize(options.name),
        type: 'module',
      } as DeclarationOptions),
    );
    return tree;
  };
}

function addMappedTypesDependencyIfApplies(options: ResourceOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    try {
        const nodeDependencyRef = getPackageJsonDependency(
          host,
          '@nestjs/swagger',
        );
        if (nodeDependencyRef) {
          options.isSwaggerInstalled = true;
          return;
        }

      // addPackageJsonDependency(host, {
      //   type: NodeDependencyType.Default,
      //   name: '@nestjs/mapped-types',
      //   version: '*',
      // });
      // context.addTask(new NodePackageInstallTask());

    } catch (err) {
      // ignore if "package.json" not found
    }
  };
}
