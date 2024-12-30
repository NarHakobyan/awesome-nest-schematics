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
import { NameParser } from '../../utils/name.parser';
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { DtoOptions } from './dto.schema';
import { toDtoClassName } from '../../utils/custom-strings';

export function main(options: DtoOptions): Rule {
  options = transform(options);
  return chain([mergeSourceRoot(options), mergeWith(generate(options))]);
}

function transform(options: DtoOptions): DtoOptions {
  const target = Object.assign({}, options);
  if (!target.name) {
    throw new SchematicsException('Option (name) is required.');
  }
  const location = new NameParser().parse(target);

  target.name = normalizeToKebabOrSnakeCase(location.name);
  target.specFileSuffix = normalizeToKebabOrSnakeCase(
    options.specFileSuffix || 'spec',
  );
  target.dtoName = toDtoClassName(target.name).replace('.', '');

  target.path = normalizeToKebabOrSnakeCase(location.path);
  target.path = target.flat
    ? join(target.path as Path, 'dtos')
    : join(target.path as Path, 'dtos', target.name);

  return target;
}

function generate(options: DtoOptions): Source {
  return (context: SchematicContext) =>
    apply(url('./files'), [
      options.spec
        ? noop()
        : filter((path) => !path.includes(`__specFileSuffix__`)),
      template({
        ...strings,
        ...options,
      }),
      move(options.path),
    ])(context);
}
