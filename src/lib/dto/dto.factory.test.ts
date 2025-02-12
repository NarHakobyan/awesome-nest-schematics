import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { DtoOptions } from './dto.schema';

describe('Dto Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json'),
  );
  it('should manage name only', async () => {
    const options: DtoOptions = {
      name: 'foo',
      spec: true,
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('dto', options);

    const files: string[] = tree.files;

    expect(
      files.find((filename) => filename === '/foo.ts'),
    ).not.toBeUndefined();
    expect(tree.readContent('/foo.ts')).toEqual('export class Foo {}\n');
  });
  it('should manage name as a path', async () => {
    const options: DtoOptions = {
      name: 'bar/foo',
      flat: false,
      spec: false,
    };
    const tree: UnitTestTree = await runner.runSchematic('dto', options);

    const files: string[] = tree.files;

    expect(
      files.find((filename) => filename === '/bar/foo/foo.ts'),
    ).not.toBeUndefined();
    expect(tree.readContent('/bar/foo/foo.ts')).toEqual(
      'export class Foo {}\n',
    );
  });
  it('should manage name and path', async () => {
    const options: DtoOptions = {
      name: 'foo',
      path: 'baz',
      flat: false,
      spec: false,
    };
    const tree: UnitTestTree = await runner.runSchematic('dto', options);

    const files: string[] = tree.files;
    expect(
      files.find((filename) => filename === '/baz/foo/foo.ts'),
    ).not.toBeUndefined();
    expect(tree.readContent('/baz/foo/foo.ts')).toEqual(
      'export class Foo {}\n',
    );
  });
  it('should manage name to normalize', async () => {
    const options: DtoOptions = {
      name: '_fooBar',
      flat: false,
      spec: false,
    };
    const tree: UnitTestTree = await runner.runSchematic('dto', options);

    const files: string[] = tree.files;
    expect(
      files.find((filename) => filename === '/_foo-bar/_foo-bar.ts'),
    ).not.toBeUndefined();
    expect(tree.readContent('/_foo-bar/_foo-bar.ts')).toEqual(
      'export class FooBar {}\n',
    );
  });
  it('should manage path to normalize', async () => {
    const options: DtoOptions = {
      name: 'barBaz/_foo',
      spec: false,
      flat: false,
    };
    const tree: UnitTestTree = await runner.runSchematic('dto', options);

    const files: string[] = tree.files;
    expect(
      files.find((filename) => filename === '/bar-baz/_foo/_foo.ts'),
    ).not.toBeUndefined();
    expect(tree.readContent('/bar-baz/_foo/_foo.ts')).toEqual(
      'export class Foo {}\n',
    );
  });

  it('should remove . from name', async () => {
    const options: DtoOptions = {
      name: 'foo.entity',
      spec: true,
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('dto', options);

    const files: string[] = tree.files;

    expect(
      files.find((filename) => filename === '/foo.entity.ts'),
    ).not.toBeUndefined();
    expect(tree.readContent('/foo.entity.ts')).toEqual(
      'export class FooEntity {}\n',
    );
  });
  it('should create a spec file', async () => {
    const options: DtoOptions = {
      name: 'foo',
      spec: true,
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('dto', options);

    const files: string[] = tree.files;

    expect(
      files.find((filename) => filename === '/foo.spec.ts'),
    ).not.toBeUndefined();
  });
  it('should create a spec file with custom file suffix', async () => {
    const options: DtoOptions = {
      name: 'foo',
      spec: true,
      specFileSuffix: 'test',
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('dto', options);

    const files: string[] = tree.files;

    expect(
      files.find((filename) => filename === '/foo.spec.ts'),
    ).toBeUndefined();
    expect(files.find((filename) => filename === '/foo.test.ts')).toBeDefined();
  });
});
