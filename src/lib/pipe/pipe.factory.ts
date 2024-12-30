import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
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
  url,
} from '@angular-devkit/schematics';
import { normalizeToKebabOrSnakeCase } from '../../utils/formatting';
import { Location, NameParser } from '../../utils/name.parser';
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { PipeOptions } from './pipe.schema';

export function main(options: PipeOptions): Rule {
  options = transform(options);
  return chain([mergeSourceRoot(options), mergeWith(generate(options))]);
}

function transform(options: PipeOptions): PipeOptions {
  const target: PipeOptions = Object.assign({}, options);
  if (!target.name) {
    throw new SchematicsException('Option (name) is required.');
  }
  const location: Location = new NameParser().parse(target);
  target.name = normalizeToKebabOrSnakeCase(location.name);
  target.path = normalizeToKebabOrSnakeCase(location.path);
  target.specFileSuffix = normalizeToKebabOrSnakeCase(
    options.specFileSuffix || 'spec',
  );

  target.path = target.flat
    ? target.path
    : join(target.path as Path, target.name);
  return target;
}

function generate(options: PipeOptions): Source {
  return (context: SchematicContext) =>
    apply(url('./files'), [
      options.spec ? noop() : filter((path) => !path.endsWith('.spec.ts')),
      options.spec
        ? noop()
        : filter((path) => !path.endsWith(`.__specFileSuffix__.ts`)),
      template({
        ...strings,
        ...options,
      }),
      move(options.path),
    ])(context);
}
