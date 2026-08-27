import React from 'react';
import { Pressable } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import SubscriptionCard from './SubscriptionCard';

const baseProps: SubscriptionCardProps = {
  icon: 1,
  name: 'Adobe Creative Cloud',
  plan: 'Teams Plan',
  category: 'Design',
  paymentMethod: 'Visa ending in 8530',
  status: 'active',
  startDate: '2025-03-20T10:00:00.000Z',
  price: 77.49,
  currency: 'USD',
  billing: 'Monthly',
  renewalDate: '2026-03-20T10:00:00.000Z',
  color: '#f5c542',
  expanded: false,
  onPress: jest.fn(),
};

describe('SubscriptionCard (collapsed)', () => {
  it('renders the subscription name, formatted price and billing cycle', () => {
    render(<SubscriptionCard {...baseProps} />);
    expect(screen.getByText('Adobe Creative Cloud')).toBeTruthy();
    expect(screen.getByText('$77.49')).toBeTruthy();
    expect(screen.getByText('Monthly')).toBeTruthy();
  });

  it('prefers the category for the meta line when present', () => {
    render(<SubscriptionCard {...baseProps} />);
    expect(screen.getByText('Design')).toBeTruthy();
  });

  it('falls back to the plan when category is missing', () => {
    render(<SubscriptionCard {...baseProps} category={undefined} />);
    expect(screen.getByText('Teams Plan')).toBeTruthy();
  });

  it('falls back to the formatted renewal date when category and plan are missing', () => {
    render(
      <SubscriptionCard {...baseProps} category={undefined} plan={undefined} />,
    );
    expect(screen.getByText('03/20/2026')).toBeTruthy();
  });

  it('does not render the expanded detail rows', () => {
    render(<SubscriptionCard {...baseProps} />);
    expect(screen.queryByText('Payment:')).toBeNull();
    expect(screen.queryByText('Status:')).toBeNull();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    render(<SubscriptionCard {...baseProps} onPress={onPress} />);
    fireEvent.press(screen.UNSAFE_getByType(Pressable));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('applies the card color as a background style when collapsed', () => {
    render(<SubscriptionCard {...baseProps} />);
    const pressable = screen.UNSAFE_getByType(Pressable);
    expect(pressable.props.style).toEqual({ backgroundColor: '#f5c542' });
  });

  it('does not apply an inline background style when no color is supplied', () => {
    render(<SubscriptionCard {...baseProps} color={undefined} />);
    const pressable = screen.UNSAFE_getByType(Pressable);
    expect(pressable.props.style).toBeUndefined();
  });
});

describe('SubscriptionCard (expanded)', () => {
  it('renders payment, category, started, renewal date and status rows', () => {
    render(<SubscriptionCard {...baseProps} expanded />);

    expect(screen.getByText('Payment:')).toBeTruthy();
    expect(screen.getByText('Visa ending in 8530')).toBeTruthy();

    expect(screen.getByText('Category:')).toBeTruthy();
    expect(screen.getAllByText('Design')).toHaveLength(2); // meta line + detail row

    expect(screen.getByText('Started:')).toBeTruthy();
    expect(screen.getByText('03/20/2025')).toBeTruthy();

    expect(screen.getByText('Renewal date:')).toBeTruthy();

    expect(screen.getByText('Status:')).toBeTruthy();
    expect(screen.getByText('Active')).toBeTruthy();
  });

  it('trims the payment method before rendering', () => {
    render(
      <SubscriptionCard
        {...baseProps}
        expanded
        paymentMethod="  Visa ending in 8530  "
      />,
    );
    expect(screen.getByText('Visa ending in 8530')).toBeTruthy();
  });

  it('renders an unknown status label when status is missing', () => {
    render(<SubscriptionCard {...baseProps} expanded status={undefined} />);
    // The "Status:" label row still renders, but with an empty value.
    expect(screen.getByText('Status:')).toBeTruthy();
  });

  it('does not apply an inline background style when expanded, even if a color is set', () => {
    render(<SubscriptionCard {...baseProps} expanded />);
    const pressable = screen.UNSAFE_getByType(Pressable);
    expect(pressable.props.style).toBeUndefined();
  });

  it('renders an empty started value when startDate is missing', () => {
    render(<SubscriptionCard {...baseProps} expanded startDate={undefined} />);
    expect(screen.getByText('Started:')).toBeTruthy();
    expect(screen.queryByText('03/20/2025')).toBeNull();
  });
});
