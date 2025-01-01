import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { <%= createHandlerClassName %> } from './commands/<%= createHandlerFileName %>.ts';
import { <%= controllerClassName %> } from './<%= controllerFileName %>.ts';
import { <%= entityClassName %> } from './<%= entityFileName %>.ts';
import { <%= translationEntityClassName %> } from './<%= translationEntityFileName %>.ts';
import { <%= serviceClassName %> } from './<%= serviceFileName %>.ts';
import { <%= getHandlerClassName %> } from './queries/<%= getHandlerFileName %>.ts';

const handlers = [
  <%= createHandlerClassName %>,
  <%= getHandlerClassName %>,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([<%= entityClassName %>, <%= translationEntityClassName %>]),
  ],
  providers: [<%= serviceClassName %>, ...handlers],
  controllers: [<%= controllerClassName %>],
})
export class <%= moduleClassName %> {}
