import {
  okResponseSchema,
  errorResponseSchema,
} from '../../src/entities/response.schema';

interface WithLabel {
  label: string;
}

describe('OkResponse Schema', () => {
  it('should validate a valid ok response', () => {
    const validResponse = { ok: true };
    const { error, value } = okResponseSchema.validate(validResponse);
    expect(error).toBeUndefined();
    expect(value).toEqual(validResponse);
  });

  it('should fail validation when "ok" is missing', () => {
    const invalidResponse = {};
    const { error } = okResponseSchema.validate(invalidResponse);
    expect(error).toBeDefined();
  });

  it('should fail validation when "ok" is not a boolean', () => {
    const invalidResponse = { ok: 'true' };
    // Disable coercion so that strings are not automatically converted.
    const { error } = okResponseSchema.validate(invalidResponse, { convert: false });
    expect(error).toBeDefined();
  });

  it('should have the label "OkResponse"', () => {
    const description = okResponseSchema.describe();
    expect((description.flags as WithLabel)?.label).toBe('OkResponse');
  });
});

describe('ErrorResponse Schema', () => {
  it('should validate a valid error response', () => {
    const validErrorResponse = {
      statusCode: 404,
      error: 'Not Found',
      message: 'Resource not found'
    };

    const { error, value } = errorResponseSchema.validate(validErrorResponse);
    expect(error).toBeUndefined();
    expect(value).toEqual(validErrorResponse);
  });

  it('should fail validation when any required property is missing', () => {
    const invalidErrorResponse = {
      statusCode: 500,
      error: 'Internal Server Error'
      // "message" is missing
    };

    const { error } = errorResponseSchema.validate(invalidErrorResponse);
    expect(error).toBeDefined();
  });

  it('should fail validation when properties have invalid types', () => {
    const invalidErrorResponse = {
      statusCode: '500', // should be a number
      error: 123,        // should be a string
      message: true      // should be a string
    };

    const { error } = errorResponseSchema.validate(invalidErrorResponse);
    expect(error).toBeDefined();
  });
});
