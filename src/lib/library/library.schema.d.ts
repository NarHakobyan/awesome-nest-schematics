import { Path } from '@angular-devkit/core';

export interface LibraryOptions {
  /**
   * Nest library name.
   */
  name: string;
  /**
   * Prefix (scope)
   */
  prefix?: string;
  /**
   * The path to create the library.
   */
  path?: string | Path;
  /**
   * The libraries root directory
   */
  rootDir?: string | Path;
}
