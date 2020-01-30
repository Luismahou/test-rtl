# Do we need `testId` when testing with RTL?

Here are 3 main use cases where I _thought_ we needed it and we don't:
* `IconButton`s: by making buttons accessible (by using `aria-label`, for example)
  we can find them with `ByLabelText` queries. See `src/IconButton.test.js`.
* Matching against the visible DOM elements only. Sometimes we need to render
  hidden DOM elements. We have one real use case in the design viewer, it renders
  multiple pages, but only one is visible to the end user, the others are
  hidden using `{ opacity: 0 }`. `jest-dom` provides `toBeVisible` matcher
  which can be use to check if a piece of text is visible or not. See `src/PageContainer.test.js`.
* Clicking on a particular button in a list. This is a bit tricky. Here's the use case:
  we have a list of items, and on each item there's a _delete_ button. We want to
  click on the delete button of the second item. Out of the box, RTL doesn't provide
  any helper method to find the delete button associated with a specific item name.
  This is solvable by iterating through all the list items (`li` elements) and
  then search for a given text `within` the `li` element. See `src/ListContainer.test.js`.

