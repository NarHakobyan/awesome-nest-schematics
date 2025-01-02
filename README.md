<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">Awesome Nestjs Schematics designed for <a href="https://github.com/NarHakobyan/awesome-nest-boilerplate" target="blank">Awesome Nestjs Boilerplate</a> 🚀</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/awesome-nest-schematics.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/awesome-nest-schematics.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/awesome-nest-schematics.svg" alt="NPM Downloads" /></a>
  <a href="https://twitter.com/NarHQ" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>

## Description

Awesome NestJS Schematics is a collection of code generators designed to streamline the development process when using the [Awesome Nest Boilerplate](https://github.com/NarHakobyan/awesome-nest-boilerplate). These schematics provide a set of commands to quickly generate various NestJS components such as controllers, services, modules, and more, ensuring consistency and reducing boilerplate code in your projects.

## Installation

First, ensure you have the [Awesome Nest Boilerplate](https://github.com/NarHakobyan/awesome-nest-boilerplate) installed in your project.

```bash
$ git clone git@github.com:NarHakobyan/awesome-nest-boilerplate.git
$ cd awesome-nest-boilerplate
$ yarn install
```

## Usage

To generate code using the schematics, run the following command:

```bash
$ nest g -c awesome-nestjs-schematics <schematic>
```

OR

```bash
$ yarn generate <schematic> <name>
```


For example, to generate a new controller:

```bash
$ nest g -c awesome-nestjs-schematics controller
```

## Types of Generators and Their Commands

- **Resource**: Generate a new Nest resource, including a controller, service, and module.
  ```bash
  $ yarn generate resource
  ```

- **DTO**: Generate a new Data Transfer Object.
  ```bash
  $ yarn generate dto
  ```

- **Controller**: Generate a new Nest controller.
  ```bash
  $ yarn generate controller
  ```

- **Decorator**: Generate a new Nest decorator.
  ```bash
  $ yarn generate decorator
  ```

- **Filter**: Generate a new Nest filter.
  ```bash
  $ yarn generate filter
  ```

- **Guard**: Generate a new Nest guard.
  ```bash
  $ yarn generate guard
  ```

- **Interceptor**: Generate a new Nest interceptor.
  ```bash
  $ yarn generate interceptor
  ```

- **Interface**: Generate a new Nest interface.
  ```bash
  $ yarn generate interface
  ```

- **Middleware**: Generate a new Nest middleware.
  ```bash
  $ yarn generate middleware
  ```

- **Module**: Generate a new Nest module.
  ```bash
  $ yarn generate module
  ```

- **Pipe**: Generate a new Nest pipe.
  ```bash
  $ yarn generate pipe
  ```

- **Provider**: Generate a new Nest provider.
  ```bash
  $ yarn generate provider
  ```

- **Service**: Generate a new Nest service.
  ```bash
  $ yarn generate service
  ```

- **Command**: Generate a new Nest CQRS command.
  ```bash
  $ yarn generate command
  ```

- **Query**: Generate a new Nest CQRS query.
  ```bash
  $ yarn generate query
  ```

## Stay in touch

- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/NarHQ)

## License

Nest is [MIT licensed](LICENSE).
