import React from 'react';
import { fireEvent, render } from '@testing-library/react';

const IconButton = ({ onClick, ariaLabel }) => (
  <button onClick={onClick} aria-label={ariaLabel}>
    <svg />
  </button>
)

test('clicks on increment button', () => {
  const onDecrement = jest.fn();
  const onIncrement = jest.fn();

  const { getByLabelText } = render(
    <div>
      <IconButton onClick={onDecrement} ariaLabel="Decrement btn" />
      <IconButton onClick={onIncrement} ariaLabel="Increment btn" />
    </div>
  )

  fireEvent.click(getByLabelText(/increment/i))

  expect(onDecrement).toHaveBeenCalledTimes(0);
  expect(onIncrement).toHaveBeenCalledTimes(1);

})
