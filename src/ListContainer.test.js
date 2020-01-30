import React from 'react';
import faker from 'faker';
import range from 'lodash/range';
import partial from 'lodash/partial';
import { within, fireEvent, render } from '@testing-library/react';
import { ListContainer } from './ListContainer';

function generateInitialItems(numItems) {
  return range(numItems).map(() => ({
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
  }));
}

/**
 * Returns all the `li` elements that contains the given `text`.
 */
function queryAllListItemByTextImpl(getAllByRole, text, options) {
  const listItems = getAllByRole('listitem');
  return listItems.filter(listItem => {
    const { queryByText } = within(listItem);
    const result = queryByText(text, options);
    return result != null;
  });
}
/**
 * Finds the first `li` element that contains the given `text`.
 */
function queryListItemByTextImpl(queryAllListItemByText, text, options) {
  const matchingListItems = queryAllListItemByText(text, options);

  // Following RTL conventions:
  // - Throw error if more than one item is found.
  // - Return `null` if none is found.
  if (matchingListItems.length === 0) {
    return null;
  }
  if (matchingListItems.length > 1) {
    throw Error(`More than one list item found for text: ${text}`);
  }

  return matchingListItems[0];
}

function renderListContainer(initialItems) {
  const utils = render(<ListContainer initialItems={initialItems} />);

  const queryAllListItemByText = partial(
    queryAllListItemByTextImpl,
    utils.getAllByRole
  );
  const queryListItemByText = partial(
    queryListItemByTextImpl,
    queryAllListItemByText
  );

  return {
    ...utils,
    queryAllListItemByText,
    queryListItemByText,
  };
}

test('renders 3 items', () => {
  const initialItems = generateInitialItems(3);
  const { container } = renderListContainer(initialItems);

  initialItems.forEach(item => {
    expect(container).toHaveTextContent(item.name);
  });
});

test('deletes second item', () => {
  const initialItems = generateInitialItems(3);
  const itemNameToRemove = new RegExp(initialItems[1].name, 'i');

  const { container, queryListItemByText } = renderListContainer(
    initialItems
  );

  // How to find an item in a list?
  // * using the index. This works if, and only if,
  //   `initialItems` are rendered in the same order.
  // * search inside each `li` by text.

  // Method 1: using the index
  // const listItems = getAllByRole('listitem');
  // const { getByText: listItemGetByText } = within(listItems[1]);

  // Method 2: searching by text
  const itemToRemove = queryListItemByText(itemNameToRemove);
  const { getByText: listItemGetByText } = within(itemToRemove);

  // Delete item
  expect(container).toHaveTextContent(itemNameToRemove)
  fireEvent.click(listItemGetByText(/delete/i));
  expect(container).not.toHaveTextContent(itemNameToRemove)
});
