import Attribute from './base';
import { AttributeCfg } from '../interface';

export default class Size extends Attribute {
  constructor(cfg: AttributeCfg) {
    super(cfg);
    this.type = 'size';
    this.names = [ 'size' ];
  }
}
