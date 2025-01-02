import { Path } from '@angular-devkit/core';

export interface ServiceOptions {
  /**
   * The name of the service.
   */
  name: string;
  /**
   * The name of the service.
   */
  moduleName: string;
  /**
   * The path to create the service.
   */
  path?: string | Path;
  /**
   * The path to insert the service declaration.
   */
  module?: Path;
  /**
   * Directive to insert declaration in module.
   */
  skipImport?: boolean;
  /**
   * Metadata name affected by declaration insertion.
   */
  metadata?: string;
  /**
   * Nest element type name
   */
  type?: string;
  /**
   * The source root path
   */
  sourceRoot?: string;
  /**
   * Specifies if a spec file is generated.
   */
  spec?: boolean;
  /**
   * Specifies the file suffix of spec files.
   * @default "spec"
   */
  specFileSuffix?: string;
  /**
   * Flag to indicate if a directory is created.
   */
  flat?: boolean;
}
