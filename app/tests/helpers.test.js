const helpers = require('../routes/helpers')

test('it validates proper IATA 3 codes', () => {

    expect(helpers.validateParams('YYZ', 'JFK')).toBe(true);

  });