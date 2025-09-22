// __tests__/component/AlertCard.test.js
import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import AlertCard from '../../components/AlertCard';

afterEach(cleanup);

describe('AlertCard Component', () => {
  it('renders title, description, location', () => {
    const { getByText } = render(
      <AlertCard
        title="Flood Alert"
        description="Heavy rain expected"
        location="Singapore"
        severity="high"
      />
    );

    expect(getByText('Flood Alert')).toBeTruthy();
    expect(getByText('Heavy rain expected')).toBeTruthy();
    expect(getByText('Singapore')).toBeTruthy();
  });

  it('applies correct severity color', () => {
    const severities = {
      high: '#FF3A3A',
      medium: '#FFA53A',
      low: '#3A9BFF',
    };

    for (const [level, color] of Object.entries(severities)) {
      const { getByTestId, unmount } = render(
        <AlertCard
          title="Test"
          description="Test"
          location="Test"
          severity={level}
        />
      );

      const severityBar = getByTestId('severity-bar');
      const flattenedStyle = StyleSheet.flatten(severityBar.props.style);

      expect(flattenedStyle.backgroundColor).toBe(color);
      unmount();
    }
  });
});
