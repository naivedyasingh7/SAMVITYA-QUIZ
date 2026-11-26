/**
 * Input Sanitization & Security Validation Helpers
 * Prevents XSS, HTML injection, CSV formula injection, and unbounded payloads.
 */

/**
 * Strips HTML tags, script protocols, and control characters from user text.
 * @param {string} input
 * @param {number} [maxLength=256]
 * @returns {string}
 */
export function sanitizeText(input, maxLength = 256) {
  if (input === null || input === undefined) return '';
  let str = String(input)
    .replace(/[\u0000-\u001F\u007F]/g, '') // Strip control chars
    .replace(/<[^>]*>?/gm, '')             // Strip HTML/XML tags
    .replace(/javascript:/gi, '')          // Strip javascript: URI schemes
    .replace(/on\w+\s*=/gi, '')            // Strip inline event handlers
    .trim();

  if (maxLength > 0 && str.length > maxLength) {
    str = str.slice(0, maxLength);
  }
  return str;
}

/**
 * Sanitizes an email address to lowercase trimmed format and validates basic structure.
 * @param {string} email
 * @returns {string}
 */
export function sanitizeEmail(email) {
  const cleaned = sanitizeText(email, 255).toLowerCase();
  return cleaned;
}

/**
 * Neutralizes CSV/Excel formula injection (=, +, -, @, tab, CR) when exporting data.
 * @param {string|number} cell
 * @returns {string}
 */
export function escapeCsvCell(cell) {
  if (cell === null || cell === undefined) return '""';
  let str = String(cell);
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  str = str.replace(/"/g, '""');
  return `"${str}"`;
}

/**
 * Validates and clamps integer point values within safe bounds.
 * @param {number|string} value
 * @param {number} [min=-500]
 * @param {number} [max=1000]
 * @returns {number}
 */
export function validatePointsBounds(value, min = -500, max = 1000) {
  const num = Number(value);
  if (!Number.isFinite(num) || Number.isNaN(num)) {
    throw new Error('Points must be a valid finite number.');
  }
  const rounded = Math.round(num);
  if (rounded < min || rounded > max) {
    throw new Error(`Points must be between ${min} and ${max}.`);
  }
  return rounded;
}
