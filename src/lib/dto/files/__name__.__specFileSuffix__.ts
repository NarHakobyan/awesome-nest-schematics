import { <%= classify(dtoName) %> } from './<%= name %>';

describe('<%= classify(dtoName) %>', () => {
  it('should be defined', () => {
    expect(new <%= classify(dtoName) %>()).toBeDefined();
  });
});
