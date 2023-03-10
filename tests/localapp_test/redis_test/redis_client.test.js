const redis_client = require('../../../localapp/redis/redis_client');

test('true egual true', () => {
    expect(true).toBe(true);
});

test('adds 1 + 2 to equal 3', () => {
    expect(redis_client.sum(1, 2)).toBe(3);
});

test('adds 2 - 1 to equal 1', () => {
    expect(redis_client.min(2, 1)).toBe(1);
});