import Attribute from './base';
import { AttributeCfg } from '../interface';

export default class Shape extends Attribute {
  constructor(cfg: AttributeCfg) {
    super(cfg);
    this.type = 'shape';
    this.names = [ 'shape' ];
  }

  /**
   * @override
   */
  getLinearValue(percent: number): number {
    const idx = Math.round((this.values.length - 1) * percent);
    return this.values[idx];
  }
}
