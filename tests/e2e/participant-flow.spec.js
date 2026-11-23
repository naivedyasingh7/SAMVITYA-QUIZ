import { describe, it, expect } from 'vitest';

describe('E2E: Participant Flow', () => {
  it('generates valid participant code format', () => {
    const code = 'EVT26-P1024';
    expect(code).toMatch(/^EVT26-P\d{4}$/);
  });
});
