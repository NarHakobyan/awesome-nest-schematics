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
    createCommandFileName: toCreateCommandFileName(name),
    getQueryFileName: toGetQueryFileName(name),
    getHandlerFileName: toGetHandlerFileName(name),
    createHandlerFileName: toCreateHandlerFileName(name),
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
    translationsTableName: toTableName(name) + '_translations',
    fileName: toFileName(name),
    controllerName: toControllerName(name),
    serviceVarName: inflection.camelize(toServiceClassName(name), true),
    createDtoVarName: inflection.camelize(toCreateDtoClassName(name), true),
    pageOptionsDtoVarName: inflection.camelize(toPageOptionsDtoClassName(name), true),
    updateDtoVarName: inflection.camelize(toUpdateDtoClassName(name), true),
    repositoryVarName: inflection.camelize(toRepositoryClassName(name), true),
    tableAliasName: toTableName(inflection.singularize(name)),
    foreignKeyFieldName: inflection.camelize(inflection.singularize(name) + 'Id', true),
    fieldName: inflection.camelize(inflection.singularize(name), true),
    foreignKeyColumnName: inflection.underscore(inflection.singularize(name) + '_id'),
    translationEntityVarName: inflection.camelize(toTranslationEntityClassName(name), true),
    translationRepositoryVarName: inflection.camelize(toTranslationRepositoryClassName(name), true),
    createFunctionName: 'create' + changeCase.pascalCase(inflection.singularize(name)),
    updateFunctionName: 'update' + changeCase.pascalCase(inflection.singularize(name)),
    deleteFunctionName: 'delete' + changeCase.pascalCase(inflection.singularize(name)),
    getSingleFunctionName: 'get' + changeCase.pascalCase(inflection.singularize(name)),
    getAllFunctionName: 'get' + changeCase.pascalCase(inflection.pluralize(name)),
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
  return `${toFileName(name)}.entity`;
}
export function toTranslationEntityFileName(name): string {
  return `${toFileName(name)}-translation.entity`;
}
export function toTranslationDtoFileName(name): string {
  return `${toFileName(name)}-translation.dto`;
}
export function toRepositoryFileName(name): string {
  return `${toFileName(name)}.repository`;
}
export function toTranslationRepositoryFileName(name): string {
  return `${toFileName(name)}-translation.repository`;
}
export function toCreateCommandFileName(name: string) {
  return `create-${toFileName(name)}.command`;
}
export function toCreateHandlerFileName(name: string) {
  return `create-${toFileName(name)}.handler`;
}
export function toGetQueryFileName(name: string) {
  return `get-${toFileName(name)}.query`;
}
export function toGetHandlerFileName(name: string) {
  return `get-${toFileName(name)}.handler`;
}
export function toControllerFileName(name: string) {
  return `${toFileName(name)}.controller`;
}
export function toDtoFileName(name: string) {
  return `${toFileName(name)}.dto`;
}
export function toNotFoundExceptionFileName(name: string) {
  return `${toFileName(name)}-not-found.exception`;
}
export function toCreateDtoFileName(name: string) {
  return `create-${toFileName(name)}.dto`;
}
export function toUpdateDtoFileName(name: string) {
  return `update-${toFileName(name)}.dto`;
}
export function toPageOptionsDtoFileName(name: string) {
  return `${toFileName(name)}-page-options.dto`;
}
export function toServiceFileName(name: string) {
  return `${toFileName(name)}.service`;
}
export function toModuleFileName(name: string) {
  return `${toFileName(name)}.module`;
}
export function toClassName(name: string) {
  return changeCase.pascalCase(inflection.singularize(name));
}
export function toTableName(name: string) {
  return inflection.underscore(inflection.pluralize(name));
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
  return inflection.dasherize(inflection.singularize(name).toLowerCase());
}
