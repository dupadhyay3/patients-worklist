import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  console.log(screen.queryByText('Sachin'))
  const linkElement = screen.getByText(/Sachin/i);
  expect(linkElement).toBeInTheDocument();
});
