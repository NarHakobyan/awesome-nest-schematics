import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicsException,
  Source,
  template,
  url,
} from '@angular-devkit/schematics';
import { normalizeToKebabOrSnakeCase } from '../../utils/formatting';
import { NameParser } from '../../utils/name.parser';
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { InterceptorOptions } from './interceptor.schema';

export function main(options: InterceptorOptions): Rule {
  options = transform(options);
  return chain([mergeSourceRoot(options), mergeWith(generate(options))]);
}

function transform(options: InterceptorOptions): InterceptorOptions {
  const target = Object.assign({}, options);
  if (!target.name) {
    throw new SchematicsException('Option (name) is required.');
  }
  const location = new NameParser().parse(target);
  target.name = normalizeToKebabOrSnakeCase(location.name);
  target.path = normalizeToKebabOrSnakeCase(join('/interceptors/' as Path, location.path));
  target.specFileSuffix = normalizeToKebabOrSnakeCase(
    options.specFileSuffix || 'spec',
  );

  target.path = target.flat
    ? target.path
    : join(target.path as Path, target.name);
  return target;
}

function generate(options: InterceptorOptions): Source {
  return (context) =>
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
