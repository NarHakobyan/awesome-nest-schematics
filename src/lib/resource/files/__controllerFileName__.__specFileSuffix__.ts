import { Test, TestingModule } from '@nestjs/testing';
import { <%= controllerClassName %> } from './<%= controllerFileName %>.ts';
import { <%= serviceClassName %> } from './<%= serviceFileName %>.ts';

describe('<%= controllerClassName %>', () => {
  let controller: <%= controllerClassName %>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [<%= controllerClassName %>],
      providers: [<%= serviceClassName %>],
    }).compile();

    controller = module.get<<%= controllerClassName %>>(<%= controllerClassName %>);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
