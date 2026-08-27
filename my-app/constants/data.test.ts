import { icons } from './icons';
import {
  tabs,
  HOME_USER,
  HOME_BALANCE,
  UPCOMING_SUBSCRIPTIONS,
  HOME_SUBSCRIPTIONS,
} from './data';

describe('tabs', () => {
  it('defines exactly four tabs in the expected order', () => {
    expect(tabs).toHaveLength(4);
    expect(tabs.map((tab) => tab.name)).toEqual([
      'index',
      'subscriptions',
      'insights',
      'settings',
    ]);
  });

  it('maps each tab name to a human readable title', () => {
    expect(tabs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'index', title: 'Home' }),
        expect.objectContaining({ name: 'subscriptions', title: 'Subscriptions' }),
        expect.objectContaining({ name: 'insights', title: 'Insights' }),
        expect.objectContaining({ name: 'settings', title: 'Settings' }),
      ]),
    );
  });

  it('assigns the actual imported image resource (not a string key) as the icon', () => {
    const byName = Object.fromEntries(tabs.map((tab) => [tab.name, tab.icon]));
    expect(byName.index).toBe(icons.home);
    expect(byName.subscriptions).toBe(icons.wallet);
    expect(byName.insights).toBe(icons.activity);
    expect(byName.settings).toBe(icons.setting);
  });
});

describe('HOME_USER', () => {
  it('has a display name', () => {
    expect(HOME_USER).toEqual({ name: 'Timothy Kalungu' });
  });
});

describe('HOME_BALANCE', () => {
  it('has a numeric amount', () => {
    expect(typeof HOME_BALANCE.amount).toBe('number');
    expect(HOME_BALANCE.amount).toBeGreaterThan(0);
  });

  it('has a parsable ISO next renewal date', () => {
    expect(() => new Date(HOME_BALANCE.nextRenewalDate)).not.toThrow();
    expect(Number.isNaN(new Date(HOME_BALANCE.nextRenewalDate).getTime())).toBe(
      false,
    );
  });
});

describe('UPCOMING_SUBSCRIPTIONS', () => {
  it('contains three entries', () => {
    expect(UPCOMING_SUBSCRIPTIONS).toHaveLength(3);
  });

  it('has unique ids', () => {
    const ids = UPCOMING_SUBSCRIPTIONS.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('provides all required fields for each entry', () => {
    UPCOMING_SUBSCRIPTIONS.forEach((item) => {
      expect(item.id).toEqual(expect.any(String));
      expect(item.name).toEqual(expect.any(String));
      expect(item.price).toEqual(expect.any(Number));
      expect(item.daysLeft).toEqual(expect.any(Number));
      expect(item.icon).toBeDefined();
    });
  });

  it('orders entries by increasing days left', () => {
    const daysLeft = UPCOMING_SUBSCRIPTIONS.map((item) => item.daysLeft);
    const sorted = [...daysLeft].sort((a, b) => a - b);
    expect(daysLeft).toEqual(sorted);
  });
});

describe('HOME_SUBSCRIPTIONS', () => {
  it('contains four entries', () => {
    expect(HOME_SUBSCRIPTIONS).toHaveLength(4);
  });

  it('has unique ids', () => {
    const ids = HOME_SUBSCRIPTIONS.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('provides all required fields for each entry', () => {
    HOME_SUBSCRIPTIONS.forEach((item) => {
      expect(item.id).toEqual(expect.any(String));
      expect(item.name).toEqual(expect.any(String));
      expect(item.icon).toBeDefined();
      expect(item.price).toEqual(expect.any(Number));
      expect(item.billing).toEqual(expect.any(String));
    });
  });

  it('only uses known status values', () => {
    const knownStatuses = ['active', 'paused', 'cancelled'];
    HOME_SUBSCRIPTIONS.forEach((item) => {
      expect(knownStatuses).toContain(item.status);
    });
  });
});
