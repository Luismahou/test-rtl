import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { PageContainer } from './PageContainer';

test('renders first page by default', () => {
  const { queryByText } = render(<PageContainer numPages={3} />);

  expect(queryByText(/page 0/i)).toBeVisible();
  expect(queryByText(/page 2/i)).not.toBeVisible();
});

test('Moves to next page', () => {
  const { getByText, queryByText } = render(<PageContainer numPages={3} />);

  expect(queryByText(/page 0/i)).toBeVisible();
  expect(queryByText(/page 1/i)).not.toBeVisible();

  fireEvent.click(getByText(/next/i));

  expect(queryByText(/page 0/i)).not.toBeVisible();
  expect(queryByText(/page 1/i)).toBeVisible();

  fireEvent.click(getByText(/next/i));

  expect(queryByText(/page 1/i)).not.toBeVisible();
  expect(queryByText(/page 2/i)).toBeVisible();

  // It doesn't go over the last page
  fireEvent.click(getByText(/next/i));
  fireEvent.click(getByText(/next/i));

  expect(queryByText(/page 1/i)).not.toBeVisible();
  expect(queryByText(/page 2/i)).toBeVisible();
});

test('Moves to previous page', () => {
  const { getByText, queryByText } = render(<PageContainer numPages={3} />);

  // Go to last page
  fireEvent.click(getByText(/next/i));
  fireEvent.click(getByText(/next/i));

  expect(queryByText(/page 2/i)).toBeVisible();

  // Go to previous page
  fireEvent.click(getByText(/prev/i));

  expect(queryByText(/page 2/i)).not.toBeVisible();
  expect(queryByText(/page 1/i)).toBeVisible();

  fireEvent.click(getByText(/prev/i));

  expect(queryByText(/page 1/i)).not.toBeVisible();
  expect(queryByText(/page 0/i)).toBeVisible();

  // It doesn't go over the first page
  fireEvent.click(getByText(/prev/i));
  fireEvent.click(getByText(/prev/i));

  expect(queryByText(/page 1/i)).not.toBeVisible();
  expect(queryByText(/page 0/i)).toBeVisible();
});
