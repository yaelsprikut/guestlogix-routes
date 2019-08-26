const routes = require('../routes/routes')
test('adds 1 + 2 to equal 3', () => {
    // expect(validateParams('', 2)).toBe(true);
})

// async/await can be used.
it('works with async/await', async () => {
    expect.assertions(1)
    const data = await user.getUserName(4)
    expect(data).toEqual('Mark')
})

// async/await can also be used with `.resolves`.
it('works with async/await and resolves', async () => {
    expect.assertions(1)
    await expect(user.getUserName(5)).resolves.toEqual('Paul')
})
