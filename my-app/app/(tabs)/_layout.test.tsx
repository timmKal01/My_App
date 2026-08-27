import React from 'react';
import { render } from '@testing-library/react-native';
import { Image, View } from 'react-native';
import { tabs } from '@/constants/data';
import { icons } from '@/constants/icons';

jest.mock('expo-router', () => {
  const Tabs = ({ children }: any) => children;
  Tabs.Screen = jest.fn(() => null);
  return { Tabs };
});

// eslint-disable-next-line import/first
import { Tabs } from 'expo-router';
// eslint-disable-next-line import/first
import TabLayout from './_layout';

const ScreenMock = Tabs.Screen as unknown as jest.Mock;

describe('TabLayout', () => {
  beforeEach(() => {
    ScreenMock.mockClear();
  });

  it('registers one Tabs.Screen per configured tab, in the configured order', () => {
    render(<TabLayout />);

    expect(ScreenMock).toHaveBeenCalledTimes(tabs.length);
    tabs.forEach((tab, index) => {
      const props = ScreenMock.mock.calls[index][0];
      expect(props.name).toBe(tab.name);
      expect(props.options.title).toBe(tab.title);
    });
  });

  it('passes the tab icon image resource straight through to the rendered Image (no lookup by string key)', () => {
    render(<TabLayout />);

    tabs.forEach((tab, index) => {
      const props = ScreenMock.mock.calls[index][0];
      const iconElement = props.options.tabBarIcon({ focused: false });
      const { UNSAFE_getByType, unmount } = render(iconElement);

      const image = UNSAFE_getByType(Image);
      expect(image.props.source).toBe(tab.icon);

      unmount();
    });
  });

  it('resolves each configured tab to its matching icon asset', () => {
    render(<TabLayout />);

    const iconByTabName = tabs.reduce<Record<string, unknown>>((acc, tab) => {
      acc[tab.name] = tab.icon;
      return acc;
    }, {});

    expect(iconByTabName.index).toBe(icons.home);
    expect(iconByTabName.subscriptions).toBe(icons.wallet);
    expect(iconByTabName.insights).toBe(icons.activity);
    expect(iconByTabName.settings).toBe(icons.setting);
  });

  it('marks the active tab pill when focused is true', () => {
    render(<TabLayout />);

    const homeProps = ScreenMock.mock.calls[0][0];
    const { UNSAFE_getAllByType } = render(
      homeProps.options.tabBarIcon({ focused: true }),
    );
    const [, pill] = UNSAFE_getAllByType(View);
    expect(pill.props.className).toContain('tabs-active');
  });

  it('does not mark the tab pill active when focused is false', () => {
    render(<TabLayout />);

    const homeProps = ScreenMock.mock.calls[0][0];
    const { UNSAFE_getAllByType } = render(
      homeProps.options.tabBarIcon({ focused: false }),
    );
    const [, pill] = UNSAFE_getAllByType(View);
    expect(pill.props.className).not.toContain('tabs-active');
  });
});
