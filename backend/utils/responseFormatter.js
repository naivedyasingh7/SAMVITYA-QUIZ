export function formatSuccess(data, message = 'Success') {
  return { success: true, data, message, timestamp: new Date().toISOString() };
}

export function formatError(code, message, details = null) {
  return { success: false, error: { code, message, details }, timestamp: new Date().toISOString() };
}
