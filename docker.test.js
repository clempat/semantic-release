describe('docker config', () => {
  beforeAll(() => {
    process.env.GCR_JSON_KEY = new Buffer.from('test').toString('base64');
  });
  it('should load the gitlab plugin', () => {
    const config = require('./docker');
    expect(config).toEqual(
      expect.objectContaining({
        plugins: expect.arrayContaining(['@semantic-release/gitlab'])
      })
    );
  });
});
