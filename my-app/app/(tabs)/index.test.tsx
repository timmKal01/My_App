import React from 'react';
import { Pressable } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import dayjs from 'dayjs';
import HomeScreen from './index';
import {
  HOME_BALANCE,
  HOME_SUBSCRIPTIONS,
  HOME_USER,
  UPCOMING_SUBSCRIPTIONS,
} from '@/constants/data';
import { formatCurrency } from '@/lib/utils';

jest.mock('expo-router', () => ({
  Link: () => null,
}));

describe('Home screen', () => {
  it('renders the "All Subscriptions" and "Upcoming" section headings', () => {
    render(<HomeScreen />);
    expect(screen.getByText('All Subscriptions')).toBeTruthy();
    expect(screen.getByText('Upcoming')).toBeTruthy();
  });

  it('renders the signed-in user name', () => {
    render(<HomeScreen />);
    expect(screen.getByText(HOME_USER.name)).toBeTruthy();
  });

  it('renders the formatted balance amount and next renewal date', () => {
    render(<HomeScreen />);
    expect(screen.getByText(formatCurrency(HOME_BALANCE.amount))).toBeTruthy();
    expect(
      screen.getByText(dayjs(HOME_BALANCE.nextRenewalDate).format('MM/DD')),
    ).toBeTruthy();
  });

  it('renders every subscription from HOME_SUBSCRIPTIONS', () => {
    render(<HomeScreen />);
    HOME_SUBSCRIPTIONS.forEach((subscription) => {
      expect(screen.getByText(subscription.name)).toBeTruthy();
    });
  });

  it('renders every upcoming subscription from UPCOMING_SUBSCRIPTIONS with its days-left label', () => {
    render(<HomeScreen />);
    UPCOMING_SUBSCRIPTIONS.forEach((subscription) => {
      expect(screen.getByText(subscription.name)).toBeTruthy();
    });
    // First upcoming item in the fixture data has more than one day left.
    expect(screen.getByText('2 days left')).toBeTruthy();
  });

  it('renders one subscription card per HOME_SUBSCRIPTIONS entry', () => {
    render(<HomeScreen />);
    const cards = screen.UNSAFE_getAllByType(Pressable);
    expect(cards).toHaveLength(HOME_SUBSCRIPTIONS.length);
  });

  it('does not show any subscription detail rows until a card is pressed', () => {
    render(<HomeScreen />);
    expect(screen.queryByText('Payment:')).toBeNull();
    expect(screen.queryByText('Status:')).toBeNull();
  });

  it('expands a subscription card when pressed and collapses it on a second press', () => {
    render(<HomeScreen />);
    const [firstCard] = screen.UNSAFE_getAllByType(Pressable);

    fireEvent.press(firstCard);
    expect(screen.getByText('Payment:')).toBeTruthy();
    expect(
      screen.getByText(HOME_SUBSCRIPTIONS[0].paymentMethod as string),
    ).toBeTruthy();

    fireEvent.press(firstCard);
    expect(screen.queryByText('Payment:')).toBeNull();
  });

  it('only keeps a single subscription card expanded at a time', () => {
    render(<HomeScreen />);
    const [firstCard, secondCard] = screen.UNSAFE_getAllByType(Pressable);

    fireEvent.press(firstCard);
    expect(
      screen.getByText(HOME_SUBSCRIPTIONS[0].paymentMethod as string),
    ).toBeTruthy();

    fireEvent.press(secondCard);
    expect(screen.getAllByText('Payment:')).toHaveLength(1);
    expect(
      screen.queryByText(HOME_SUBSCRIPTIONS[0].paymentMethod as string),
    ).toBeNull();
    expect(
      screen.getByText(HOME_SUBSCRIPTIONS[1].paymentMethod as string),
    ).toBeTruthy();
  });
});
