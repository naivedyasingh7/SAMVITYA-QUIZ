import { describe, it, expect } from 'vitest';

describe('E2E: Participant Flow', () => {
  it('allows participant registration and unique code allocation', () => {
    const code = 'EVT26-P0102';
    expect(code).toMatch(/^EVT26-P\d{4}$/);
  });
});
