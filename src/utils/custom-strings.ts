import * as inflection from 'inflection';
import * as changeCase from "change-case-commonjs";

export function generate(name: string) {
  return {
    controllerClassName: toControllerClassName(name),
    serviceClassName: toServiceClassName(name),
    moduleClassName: toModuleClassName(name),
    dtoClassName: toDtoClassName(name),
    translationDtoClassName: toTranslationDtoClassName(name),
    updateDtoClassName: toUpdateDtoClassName(name),
    dtoOptionInterfaceName: toDtoOptionInterfaceName(name),
    createDtoClassName: toCreateDtoClassName(name),
    entityClassName: toEntityClassName(name),
    translationEntityClassName: toTranslationEntityClassName(name),
    createCommandClassName: toCreateCommandClassName(name),
    createHandlerClassName: toCreateHandlerClassName(name),
    getHandlerClassName: toGetHandlerClassName(name),
    getQueryClassName: toGetQueryClassName(name),
    pageOptionsDtoClassName: toPageOptionsDtoClassName(name),
    notFoundExceptionClassName: toNotFoundExceptionClassName(name),
    entityFileName: toEntityFileName(name),
    translationEntityFileName: toTranslationEntityFileName(name),
    translationDtoFileName: toTranslationDtoFileName(name),
    repositoryFileName: toRepositoryFileName(name),
    translationRepositoryFileName: toTranslationRepositoryFileName(name),
    createCommandFileName: toCreateCommandFileName(name),
    getQueryFileName: toGetQueryFileName(name),
    controllerFileName: toControllerFileName(name),
    dtoFileName: toDtoFileName(name),
    notFoundExceptionFileName: toNotFoundExceptionFileName(name),
    createDtoFileName: toCreateDtoFileName(name),
    updateDtoFileName: toUpdateDtoFileName(name),
    pageOptionsDtoFileName: toPageOptionsDtoFileName(name),
    serviceFileName: toServiceFileName(name),
    moduleFileName: toModuleFileName(name),
    className: toClassName(name),
    tableName: toTableName(name),
    repositoryClassName: toRepositoryClassName(name),
    translationRepositoryClassName: toTranslationRepositoryClassName(name),
    fileName: toFileName(name),
    controllerName: toControllerName(name),
    serviceVarName: inflection.camelize(toServiceClassName(name), true),
    createDtoVarName: inflection.camelize(toCreateDtoClassName(name), true),
    pageOptionsDtoVarName: inflection.camelize(toPageOptionsDtoClassName(name), true),
    updateDtoVarName: inflection.camelize(toUpdateDtoClassName(name), true),
    createFunctionName: 'create' + toClassName(name),
    updateFunctionName: 'update' + toClassName(name),
    deleteFunctionName: 'delete' + toClassName(name),
    getSingleFunctionName: 'get' + toClassName(name),
    getAllFunctionName: 'getAll' + toClassName(name),
  }
}


export function toControllerClassName(name: string) {
  return `${toClassName(name)}Controller`;
}
export function toServiceClassName(name): string {
  return `${toClassName(name)}Service`;
}
export function toModuleClassName(name): string {
  return `${toClassName(name)}Module`;
}
export function toDtoClassName(name): string {
  return `${toClassName(name)}Dto`;
}
export function toTranslationDtoClassName(name): string {
  return `${toClassName(name)}TranslationDto`;
}
export function toUpdateDtoClassName(name): string {
  return `Update${toDtoClassName(name)}`;
}
export function toDtoOptionInterfaceName(name): string {
  return `I${toDtoClassName(name)}Options`;
}
export function toCreateDtoClassName(name): string {
  return `Create${toDtoClassName(name)}`;
}
export function toEntityClassName(name): string {
  return `${toClassName(name)}Entity`;
}
export function toTranslationEntityClassName(name): string {
  return `${toClassName(name)}TranslationEntity`;
}
export function toCreateCommandClassName(name): string {
  return `Create${toClassName(name)}Command`;
}
export function toCreateHandlerClassName(name): string {
  return `Create${toClassName(name)}Handler`;
}
export function toGetHandlerClassName(name): string {
  return `Get${toClassName(name)}Handler`;
}
export function toGetQueryClassName(name): string {
  return `Get${toClassName(name)}Query`;
}
export function toPageOptionsDtoClassName(name): string {
  return toClassName(name) + 'PageOptionsDto';
}
export function toNotFoundExceptionClassName(name): string {
  return toClassName(name) + 'NotFoundException';
}
export function toEntityFileName(name): string {
  return `${toFileName(name)}.entity.ts`;
}
export function toTranslationEntityFileName(name): string {
  return `${toFileName(name)}-translation.entity.ts`;
}
export function toTranslationDtoFileName(name): string {
  return `${toFileName(name)}-translation.dto.ts`;
}
export function toRepositoryFileName(name): string {
  return `${toFileName(name)}.repository.ts`;
}
export function toTranslationRepositoryFileName(name): string {
  return `${toFileName(name)}-translation.repository.ts`;
}
export function toCreateCommandFileName(name: string) {
  return `create-${toFileName(name)}.command.ts`;
}
export function toGetQueryFileName(name: string) {
  return `get-${toFileName(name)}.query.ts`;
}
export function toControllerFileName(name: string) {
  return `${toFileName(name)}.controller.ts`;
}
export function toDtoFileName(name: string) {
  return `${toFileName(name)}.dto.ts`;
}
export function toNotFoundExceptionFileName(name: string) {
  return `${toFileName(name)}-not-found.exception.ts`;
}
export function toCreateDtoFileName(name: string) {
  return `create-${toFileName(name)}.dto.ts`;
}
export function toUpdateDtoFileName(name: string) {
  return `update-${toFileName(name)}.dto.ts`;
}
export function toPageOptionsDtoFileName(name: string) {
  return `${toFileName(name)}-page-options.dto.ts`;
}
export function toServiceFileName(name: string) {
  return `${toFileName(name)}.service.ts`;
}
export function toModuleFileName(name: string) {
  return `${toFileName(name)}.module.ts`;
}
export function toClassName(name: string) {
  return changeCase.pascalCase(name);
}
export function toTableName(name: string) {
  return inflection.dasherize(inflection.pluralize(name));
}
export function toControllerName(name: string) {
  return inflection.dasherize(inflection.pluralize(name));
}
export function toRepositoryClassName(name: string) {
  return `${toClassName(name)}Repository`;
}
export function toTranslationRepositoryClassName(name: string) {
  return `${toClassName(name)}TranslationRepository`;
}
export function toFileName(name: string) {
  return inflection.dasherize(name.toLowerCase());
}
