export function validatePayload(validatorFn) {
  return (req, res, next) => {
    const result = validatorFn(req.body);
    if (!result.isValid) {
      return res.status(400).json({ success: false, errors: result.errors });
    }
    next();
  };
}
