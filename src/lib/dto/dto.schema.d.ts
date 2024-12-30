export interface DtoOptions {
  /**
   * The name of the dto.
   */
  name: string;
  /**
   * The module to create the dto.
   */
  path?: string;
  /**
   * The source root path.
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
  /**
   * Dto name to be used internally.
   */
  dtoName?: string;
}
