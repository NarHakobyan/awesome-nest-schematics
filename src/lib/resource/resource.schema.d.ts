import { Path } from '@angular-devkit/core';

export interface ResourceOptions {
  /**
   * The name of the resource.
   */
  name: string;
  /**
   * The path to create the resource.
   */
  path?: string | Path;
  /**
   * The source root path
   */
  sourceRoot?: string;
  /**
   * Specifies if spec files are generated.
   */
  spec?: boolean;
  /**
   * Specifies the file suffix of spec files.
   * @default "spec"
   */
  specFileSuffix?: string;
  /**
   * The path to insert the module declaration.
   */
  module?: Path;
  /**
   * Metadata name affected by declaration insertion.
   */
  metadata?: string;
  /**
   * Directive to insert declaration in module.
   */
  skipImport?: boolean;
  /**
   * Flag to indicate if a directory is created.
   */
  flat?: boolean;
  /**
   * When true, "@nestjs/swagger" dependency is installed in the project.
   */
  isSwaggerInstalled?: boolean;
}
