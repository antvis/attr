import { isNil, isArray } from '@antv/util';
import Attribute from './base';
import { AttributeCfg } from '../interface';

export type Value = number | string;
export type MappingValue = Value[] | Value;

export default class Position extends Attribute {
  constructor(cfg: AttributeCfg) {
    super(cfg);
    this.names = [ 'x', 'y' ];
    this.type = 'position';
  }

  mapping(x: MappingValue, y: MappingValue) {
    const [ scaleX, scaleY ] = this.scales;

    if (isNil(x) || isNil(y)) {
      return [];
    }

    return [
      isArray(x) ? x.map((xi) => scaleX.scale(xi)) : scaleX.scale(x),
      isArray(y) ? y.map((yi) => scaleY.scale(yi)) : scaleY.scale(y),
    ];
  }
}
