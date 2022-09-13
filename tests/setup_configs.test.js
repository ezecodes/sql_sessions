const configObjMock = require('../src/config/config')
jest.mock('../src/config/config')

describe('Before server starts', () => {
	it('should contain the ideal configuration object', () => {
		expect(configObjMock).toEqual(
			expect.objectContaining({
				sqlConfig: expect.objectContaining({
					host: expect.any(String),
					user: expect.any(String),
					password: expect.any(String),
					database: expect.any(String),
				}),
				port: expect.any(String),
				jwtsecret: expect.any(String)
			})
		)
	})
})

