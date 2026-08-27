import images from './image';

describe('images', () => {
  it('exposes an avatar image', () => {
    expect(images).toHaveProperty('avatar');
    expect(images.avatar).toBeDefined();
  });

  it('exposes a splash pattern image', () => {
    expect(images).toHaveProperty('splashPattern');
    expect(images.splashPattern).toBeDefined();
  });

  it('only exposes the expected keys', () => {
    expect(Object.keys(images).sort()).toEqual(['avatar', 'splashPattern']);
  });
});
