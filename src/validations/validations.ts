export const validationFailAction = (_request: any, h: any, err: any) => {
  if (err.isJoi && err.details) {
    const errors = err.details.map((detail: any) => ({
      field: detail.context.key,
      message: detail.message
    }));
    return h.response({ errors }).code(400).takeover();
  }
  return h.response(err).code(400).takeover();
};