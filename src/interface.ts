import { Scale } from '@antv/scale';

export { Scale };

export type CallbackType = (...params: any[]) => any[];

export interface AttributeCfg {
  readonly type?: string;
  readonly scales: Scale[];
  readonly values?: any[];
  readonly callback?: CallbackType;
  readonly names: string[];
}
