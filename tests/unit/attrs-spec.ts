import { getScale } from '@antv/scale';
import * as Attr from '../../src';

const Identity = getScale('identity');
const Category = getScale('category');
const Linear = getScale('linear');

describe('attr test color', () => {
  const scaleIdentity = new Identity({
    field: 'type',
    values: ['red'],
  });

  const scaleCat = new Category({
    field: 'type',
    values: ['a', 'b', 'c', 'd'],
  });

  const scaleLinear = new Linear({
    field: 'age',
    min: 0,
    max: 10,
  });

  describe('no callback category', () => {
    const color = new Attr.Color({
      scales: [scaleCat, scaleLinear],
      values: ['c1', 'c2', 'c3'],
    });
    it('init', () => {
      expect(color.type).toBe('color');
      expect(color.getNames()).toEqual(['color']);
    });

    it('mapping', () => {
      expect(color.mapping('a')[0]).toBe('c1');
      expect(color.mapping('b')[0]).toBe('c2');
      expect(color.mapping('c')[0]).toBe('c3');
      expect(color.mapping('d')[0]).toBe('c1');
    });
  });

  describe('no callback linear', () => {
    const color = new Attr.Color({
      scales: [scaleLinear],
      values: ['#000000', '#0000ff', '#00ff00', '#ff0000', '#ffffff'],
    });

    it('mapping', () => {
      expect(color.mapping(0)[0]).toBe('#000000');
      expect(color.mapping(2.5)[0]).toBe('#0000ff');
      expect(color.mapping(5)[0]).toBe('#00ff00');
      expect(color.mapping(10)[0]).toBe('#ffffff');
      expect(color.mapping(4)[0]).toBe('#009966');
    });
  });

  describe('scale identity', () => {
    const color = new Attr.Color({
      scales: [scaleIdentity],
      values: ['#000000', '#0000ff', '#00ff00', '#ff0000', '#ffffff'],
    });
    it('mapping', () => {
      expect(color.mapping(0)[0]).toBe('red');
    });
  });

  describe('color gradient', function() {
    const color = new Attr.Color({
      scales: [scaleCat],
      values: '#000000-#0000ff',
    });
    it('init', function() {
      expect(color.linear).toBe(true);
    });
    it('mapping', function() {
      expect(color.mapping('a')[0]).toBe('#000000');
      expect(color.mapping('b')[0]).toBe('#000055');
      expect(color.mapping('c')[0]).toBe('#0000aa');
      expect(color.mapping('d')[0]).toBe('#0000ff');
    });
    it('single color', function() {
      const colorAttr = new Attr.Color({
        scales: [scaleCat],
        values: 'red',
      });
      expect(colorAttr.mapping('a')[0]).toBe('#ff0000');
      expect(colorAttr.mapping('b')[0]).toBe('#ff0000');
      expect(colorAttr.mapping('c')[0]).toBe('#ff0000');
      expect(colorAttr.mapping('d')[0]).toBe('#ff0000');
    });
  });
});

describe('attr test size & opacity', () => {
  const scaleCat = new Category({
    field: 'type',
    values: ['a', 'b', 'c', 'd'],
  });

  const scaleLinear = new Linear({
    field: 'age',
    min: 0,
    max: 10,
  });
  it('mapping size two size', () => {
    const size = new Attr.Size({
      scales: [scaleLinear],
      values: [0, 100],
    });
    expect(size.type).toBe('size');
    expect(size.mapping(0)[0]).toBe(0);
    expect(size.mapping(10)[0]).toBe(100);
    expect(size.mapping(5)[0]).toBe(50);
  });

  it('mapping size three size', () => {
    const size = new Attr.Size({
      scales: [scaleLinear],
      values: [0, 10, 100],
    });
    expect(size.mapping(0)[0]).toBe(0);
    expect(size.mapping(10)[0]).toBe(100);
    expect(size.mapping(4)[0]).toBe(8);
    expect(size.mapping(8)[0]).toBe(64);
  });

  it('mapping size category', () => {
    const size = new Attr.Size({
      scales: [scaleCat],
      values: [0, 10, 100],
    });

    expect(size.mapping('a')[0]).toBe(0);
    expect(size.mapping('b')[0]).toBe(10);
    expect(size.mapping('c')[0]).toBe(100);
  });

  it('mapping opacity', () => {
    const opactiy = new Attr.Opacity({
      scales: [scaleLinear],
      values: [0, 1],
    });
    expect(opactiy.type).toBe('opacity');
    expect(opactiy.mapping(0)[0]).toBe(0);
    expect(opactiy.mapping(10)[0]).toBe(1);
    expect(opactiy.mapping(5)[0]).toBe(0.5);
  });
});

describe('attr test shape', () => {
  const scaleCat = new Category({
    field: 'type',
    values: ['a', 'b', 'c', 'd'],
  });

  const scaleLinear = new Linear({
    field: 'age',
    min: 0,
    max: 10,
  });

  it('init', function() {
    // @ts-ignore
    const shape = new Attr.Shape({});

    expect(shape.type).toBe('shape');
    expect(shape.getNames().length).toBe(0);
  });
  it('test category mapping', function() {
    const shape = new Attr.Shape({
      scales: [scaleCat],
      values: ['s1', 's2'],
    });
    expect(shape.mapping('a')[0]).toBe('s1');
    expect(shape.mapping('b')[0]).toBe('s2');
    expect(shape.mapping('c')[0]).toBe('s1');
    expect(shape.mapping('d')[0]).toBe('s2');
  });

  it('test linear mapping', function() {
    const shape = new Attr.Shape({
      scales: [scaleLinear],
      values: ['s1', 's2'],
    });
    expect(shape.mapping(0)[0]).toBe('s1');
    expect(shape.mapping(4)[0]).toBe('s1');
    expect(shape.mapping(9)[0]).toBe('s2');
    expect(shape.mapping(10)[0]).toBe('s2');
  });
});

describe('attr test position', () => {
  const scaleCat = new Category({
    field: 'type',
    values: ['a', 'b', 'c', 'd', 'e'],
  });

  const scaleLinear = new Linear({
    field: 'age',
    min: 0,
    max: 10,
  });

  const position = new Attr.Position({
    scales: [scaleCat, scaleLinear],
  });

  it('init', () => {
    expect(position.type).toBe('position');
    expect(position.getNames().length).toBe(2);
  });
  it('mapping x,y', () => {
    const rst = position.mapping('a', 3);
    expect(rst).toEqual([0, 0.3]);
  });
  it('mapping x, [y1,y2]', () => {
    const rst = position.mapping('b', [4, 6]);
    expect(rst).toEqual([0.25, [0.4, 0.6]]);
  });
  it('mapping [x1,x2], y', () => {
    const rst = position.mapping(['b', 'c'], 8);
    expect(rst).toEqual([[0.25, 0.5], 0.8]);
  });
  it('mapping [x1,x2], [y1, y2]', () => {
    const rst = position.mapping(['b', 'c', 'd'], [4, 6, 10]);
    expect(rst).toEqual([
      [0.25, 0.5, 0.75],
      [0.4, 0.6, 1],
    ]);
  });
  it('mapping x, y 0', function() {
    const rst = position.mapping('a', 0);
    expect(rst).toEqual([0, 0]);
  });
});
