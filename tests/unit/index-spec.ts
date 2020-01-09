import {
  Attribute,
  Color,
  getAttribute,
  Opacity,
  Position,
  registerAttribute,
  Shape,
  Size,
} from '../../src';

import 'jest-extended';

describe('Attr', () => {
  it('Attr', () => {
    [Position, Shape, Color, Size, Opacity, Attribute, getAttribute, registerAttribute].forEach((each) => {
      expect(each).toBeDefined();
    });
  });
});
