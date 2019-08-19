import { expect } from 'chai';
import { Attribute as Attr } from '../../src';
import { getScale } from '@antv/scale';

const Identity = getScale('identity');
const Category = getScale('category');
const Linear = getScale('linear');


describe('attr base test', function() {
  const scale1 = new Linear({
    field: 'dim1',
    min: 0,
    max: 100
  });
  const scale2 = new Category({
    field: 'dim2',
    values: [ 'a', 'b', 'c', 'd' ]
  });
  it('test init', function() {
    const attr = new Attr({
      type: 'test',
      names: [ 't1', 't2' ],
      scales: [ scale1, scale2 ]
    });
    expect(attr.type).equal('test');
    expect(attr.getNames()).eqls([ 't1', 't2' ]);
  });
  it('test callback', function() {
    const attr = new Attr({
      type: 'test',
      names: [ 't1', 't2' ],
      callback(v1, v2) {
        return v1 + v2;
      },
      scales: [ scale1, scale2 ]
    });

    const rst = attr.mapping(10, 'a');
    expect(rst[0]).equal('10a');
  });

  it('test 0 as function callback', () => {
    const attr = new Attr({
      type: 'test',
      names: [ 't1', 't2' ],
      callback(v1, v2) {
        return v2 === 'a' ? 0 : 1;
      },
      scales: [ scale1, scale2 ]
    });

    expect(attr.mapping(10, 'a')[0]).equal(0);
    expect(attr.mapping(10, 'b')[0]).equal(1);
    expect(attr.mapping(10, 'c')[0]).equal(1);
    expect(attr.mapping(10, 'd')[0]).equal(1);
  });

  it('test linear scale with two values', function() {
    const attr = new Attr({
      type: 'test',
      names: [ 't1', 't2' ],
      values: [ 0, 10 ],
      scales: [ scale1, scale2 ]
    });
    const rst = attr.mapping(10, 'a');
    expect(rst[0]).equal(1);
  });

  it('test linear scale with three values', function() {
    const attr = new Attr({
      type: 'test',
      names: [ 't1', 't2' ],
      values: [ 0, 10, 40 ],
      scales: [ scale1, scale2 ]
    });
    let rst = attr.mapping(40);
    expect(rst[0]).equal(8);
    rst = attr.mapping(60);
    expect(Math.round(rst[0])).equal(16);
  });

  it('test cat scale with values', function() {
    const attr = new Attr({
      type: 'test',
      names: [ 't1', 't2' ],
      values: [ 'red', 'blue' ],
      scales: [ scale2, scale1 ]
    });
    let rst = attr.mapping('a');
    expect(rst[0]).equal('red');
    rst = attr.mapping('b');
    expect(rst[0]).equal('blue');
  });

});
