import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { <%= createHandlerClassName %> } from './commands/<%= createCommandFileName %>';
import { <%= controllerClassName %> } from './<%= controllerFileName %>';
import { <%= repositoryClassName %> } from './<%= repositoryFileName %>';
import { <%= translationRepositoryClassName %> } from './<%= translationRepositoryFileName %>';
import { <%= serviceClassName %> } from './<%= serviceFileName %>';
import { <%= getHandlerClassName %> } from './queries/<%= getHandlerFileName %>';

const handlers = [
  <%= createHandlerClassName %>,
  <%= getHandlerClassName %>,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([<%= repositoryClassName %>, <%= translationRepositoryClassName %>]),
  ],
  providers: [<%= serviceClassName %>, ...handlers],
  controllers: [<%= controllerClassName %>],
})
export class <%= moduleClassName %> {}
