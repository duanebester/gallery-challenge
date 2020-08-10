import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('App contains Gallery', () => {
  render(<App />);
  const Gallery = screen.getByTestId('gallery');
  expect(Gallery).toBeInTheDocument();
});
