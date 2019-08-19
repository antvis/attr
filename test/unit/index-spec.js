import { expect } from 'chai';
import {
  Position, Shape, Color, Size, Opacity,
  colorUtil,
  Attribute, getAttribute, registerAttribute
} from '../../src';

describe('Attr', () => {
  it('Attr', () => {
    expect([
      Position, Shape, Color, Size, Opacity,
      colorUtil,
      Attribute, getAttribute, registerAttribute
    ]).to.not.include.keys(undefined);
  });
});
