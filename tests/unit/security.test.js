import { describe, it, expect, vi } from 'vitest';
import {
  sanitizeText,
  sanitizeEmail,
  escapeCsvCell,
  validatePointsBounds
} from '../../shared/utils/sanitize.js';
import { requireAdminRole } from '../../backend/middleware/authMiddleware.js';

describe('Security Hardening & Input Sanitization', () => {
  it('strips XSS script tags, inline handlers, and javascript: URIs', () => {
    const dirty = '<script>alert(1)</script><img src=x onerror=alert(2)>javascript:void(0) Alex';
    const clean = sanitizeText(dirty);
    expect(clean).not.toContain('<script>');
    expect(clean).not.toContain('onerror=');
    expect(clean).not.toContain('javascript:');
    expect(clean).toContain('Alex');
  });

  it('normalizes emails and clamps overly long input', () => {
    const longText = 'A'.repeat(500);
    expect(sanitizeText(longText, 128)).toHaveLength(128);
    expect(sanitizeEmail('  User@Example.COM ')).toBe('user@example.com');
  });

  it('neutralizes CSV formula injection payloads', () => {
    expect(escapeCsvCell('=CMD("calc")')).toBe('"\'=CMD(""calc"")"');
    expect(escapeCsvCell('+1234')).toBe('"\'+1234"');
    expect(escapeCsvCell('-1234')).toBe('"\'-1234"');
    expect(escapeCsvCell('@SUM(A1:A2)')).toBe('"\'@SUM(A1:A2)"');
    expect(escapeCsvCell('Normal Name')).toBe('"Normal Name"');
  });

  it('enforces strict numeric bounds on points transactions', () => {
    expect(validatePointsBounds(50)).toBe(50);
    expect(validatePointsBounds(-20)).toBe(-20);
    expect(() => validatePointsBounds(NaN)).toThrow();
    expect(() => validatePointsBounds(Infinity)).toThrow();
    expect(() => validatePointsBounds(50000)).toThrow();
    expect(() => validatePointsBounds(-5000)).toThrow();
  });

  it('rejects unauthenticated requests in requireAdminRole middleware (no blind pass-through)', async () => {
    const req = { headers: {} };
    const res = {
      statusCode: 200,
      body: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        this.body = payload;
        return this;
      }
    };
    const next = vi.fn();

    await requireAdminRole(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
    expect(next).not.toHaveBeenCalled();
  });
});
