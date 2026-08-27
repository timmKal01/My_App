import { formatCurrency, formatStatusLabel, formatSubscriptionDateTime } from './utils';

describe('formatCurrency', () => {
  it('formats a positive value using the default USD currency', () => {
    expect(formatCurrency(1450.48)).toBe('$1,450.48');
  });

  it('formats a value using an explicit currency code', () => {
    expect(formatCurrency(12, 'EUR')).toBe('€12.00');
  });

  it('always renders two decimal places', () => {
    expect(formatCurrency(5)).toBe('$5.00');
  });

  it('rounds to two decimal places for values with more precision', () => {
    expect(formatCurrency(9.995)).toBe('$10.00');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats negative values correctly', () => {
    expect(formatCurrency(-20)).toBe('-$20.00');
  });

  it('adds thousands separators for large values', () => {
    expect(formatCurrency(1234567.89)).toBe('$1,234,567.89');
  });

  it('falls back to a plain fixed-point string when the currency code is invalid', () => {
    expect(formatCurrency(5, 'US')).toBe('5.00');
  });

  it('falls back to a plain fixed-point string for a completely bogus currency', () => {
    expect(formatCurrency(19.999, 'NOTREAL')).toBe('20.00');
  });
});

describe('formatSubscriptionDateTime', () => {
  it('returns "Not provided" when given undefined', () => {
    expect(formatSubscriptionDateTime(undefined)).toBe('Not provided');
  });

  it('returns "Not provided" when given an empty string', () => {
    expect(formatSubscriptionDateTime('')).toBe('Not provided');
  });

  it('returns "Not provided" for an unparsable date string', () => {
    expect(formatSubscriptionDateTime('not-a-real-date')).toBe('Not provided');
  });

  it('formats a valid ISO date string as MM/DD/YYYY', () => {
    expect(formatSubscriptionDateTime('2026-03-20T10:00:00.000Z')).toBe(
      '03/20/2026',
    );
  });

  it('formats a valid date-only string as MM/DD/YYYY', () => {
    expect(formatSubscriptionDateTime('2025-01-05')).toBe('01/05/2025');
  });
});

describe('formatStatusLabel', () => {
  it('returns "Unknown" when given undefined', () => {
    expect(formatStatusLabel(undefined)).toBe('Unknown');
  });

  it('returns "Unknown" when given an empty string', () => {
    expect(formatStatusLabel('')).toBe('Unknown');
  });

  it('capitalizes the first letter of a lowercase status', () => {
    expect(formatStatusLabel('active')).toBe('Active');
  });

  it('capitalizes the first letter of a single-character status', () => {
    expect(formatStatusLabel('a')).toBe('A');
  });

  it('leaves the remainder of the string untouched', () => {
    expect(formatStatusLabel('cancelled')).toBe('Cancelled');
  });

  it('does not lowercase an already-uppercase remainder', () => {
    expect(formatStatusLabel('PAUSED')).toBe('PAUSED');
  });
});
