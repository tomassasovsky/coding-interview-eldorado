import { validationFailAction } from '@/validations/validations';

describe('validationFailAction', () => {
  let h: any;
  let responseMock: any;

  beforeEach(() => {
    // Create a mock response object that simulates h.response().code(...).takeover()
    responseMock = {
      code: jest.fn().mockReturnThis(), // Returns itself so that .takeover() can be chained.
      takeover: jest.fn().mockReturnValue('takeoverResult')
    };
    h = {
      response: jest.fn().mockReturnValue(responseMock)
    };
  });

  it('should return a 400 response with errors when err is a Joi error', () => {
    // Simulate a Joi error with details
    const err = {
      isJoi: true,
      details: [
        { context: { key: 'name' }, message: '"name" is required' },
        { context: { key: 'price' }, message: '"price" must be a number' }
      ]
    };

    const result = validationFailAction({}, h, err);

    // Verify that h.response was called with the expected errors object.
    expect(h.response).toHaveBeenCalledWith({
      errors: [
        { field: 'name', message: '"name" is required' },
        { field: 'price', message: '"price" must be a number' }
      ]
    });
    // Verify that .code(400) was called.
    expect(responseMock.code).toHaveBeenCalledWith(400);
    // Verify that .takeover() was called and that the function returns its value.
    expect(responseMock.takeover).toHaveBeenCalled();
    expect(result).toEqual('takeoverResult');
  });

  it('should return a 400 response with the error when err is not a Joi error', () => {
    // Simulate a generic error (non-Joi)
    const err = new Error('Some error occurred');

    const result = validationFailAction({}, h, err);

    // Verify that h.response was called with the error.
    expect(h.response).toHaveBeenCalledWith(err);
    expect(responseMock.code).toHaveBeenCalledWith(400);
    expect(responseMock.takeover).toHaveBeenCalled();
    expect(result).toEqual('takeoverResult');
  });
});
