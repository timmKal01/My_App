import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ListHeading from './ListHeading';

describe('ListHeading', () => {
  it('renders the provided title', () => {
    render(<ListHeading title="All Subscriptions" />);
    expect(screen.getByText('All Subscriptions')).toBeTruthy();
  });

  it('renders a "View All" action', () => {
    render(<ListHeading title="Upcoming" />);
    expect(screen.getByText('View All')).toBeTruthy();
  });

  it('re-renders with an updated title', () => {
    const { rerender } = render(<ListHeading title="Upcoming" />);
    expect(screen.getByText('Upcoming')).toBeTruthy();

    rerender(<ListHeading title="All Subscriptions" />);
    expect(screen.queryByText('Upcoming')).toBeNull();
    expect(screen.getByText('All Subscriptions')).toBeTruthy();
  });

  it('renders an empty title without crashing', () => {
    render(<ListHeading title="" />);
    expect(screen.getByText('View All')).toBeTruthy();
  });
});
