import { isString } from '@antv/util';
import colorUtil from '../util/color-util';
import Attribute from './base';
import { AttributeCfg } from '../interface';

export default class Color extends Attribute {

  gradient: Function;

  constructor(cfg: AttributeCfg) {
    super(cfg);
    this.type = 'color';
    this.names = [ 'color' ];

    if (isString(this.values)) {
      this.linear = true;
    }

    this.gradient = colorUtil.gradient(this.values);
  }

  /**
   * @override
   */
  getLinearValue(percent: number): number {
    return this.gradient(percent);
  }
}
