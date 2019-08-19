import Attribute from './base';
import { AttributeCfg } from '../interface';

export default class Opacity extends Attribute {
  constructor(cfg: AttributeCfg) {
    super(cfg);
    this.type = 'opacity';
    this.names = [ 'opacity' ];
  }
}
