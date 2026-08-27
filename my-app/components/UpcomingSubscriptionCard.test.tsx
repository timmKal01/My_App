import React from 'react';
import { render, screen } from '@testing-library/react-native';
import UpcomingSubscriptionCard from './UpcomingSubscriptionCard';

const baseProps: UpcomingSubscriptionCardProps = {
  name: 'Spotify',
  price: 5.99,
  currency: 'USD',
  icon: 1,
  daysLeft: 2,
};

describe('UpcomingSubscriptionCard', () => {
  it('renders the subscription name', () => {
    render(<UpcomingSubscriptionCard {...baseProps} />);
    expect(screen.getByText('Spotify')).toBeTruthy();
  });

  it('renders the price formatted as currency', () => {
    render(<UpcomingSubscriptionCard {...baseProps} />);
    expect(screen.getByText('$5.99')).toBeTruthy();
  });

  it('defaults to USD formatting when no currency is supplied', () => {
    render(<UpcomingSubscriptionCard {...baseProps} currency={undefined} price={12} />);
    expect(screen.getByText('$12.00')).toBeTruthy();
  });

  it('shows the plural days-left label when more than one day remains', () => {
    render(<UpcomingSubscriptionCard {...baseProps} daysLeft={4} />);
    expect(screen.getByText('4 days left')).toBeTruthy();
  });

  it('shows "Last day" when exactly one day remains', () => {
    render(<UpcomingSubscriptionCard {...baseProps} daysLeft={1} />);
    expect(screen.getByText('Last day')).toBeTruthy();
  });

  it('shows "Last day" when zero or fewer days remain', () => {
    render(<UpcomingSubscriptionCard {...baseProps} daysLeft={0} />);
    expect(screen.getByText('Last day')).toBeTruthy();
  });

  it('truncates a long subscription name to a single line', () => {
    render(
      <UpcomingSubscriptionCard
        {...baseProps}
        name="A Really Long Subscription Service Name"
      />,
    );
    const nameNode = screen.getByText('A Really Long Subscription Service Name');
    expect(nameNode.props.numberOfLines).toBe(1);
  });
});
