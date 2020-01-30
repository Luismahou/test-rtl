import React from 'react';

const Item = ({ content, onDelete }) => {
  return (
    <div>
      <div>{content}</div>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export const ListContainer = ({ initialItems }) => {
  const [items, setItems] = React.useState(initialItems);

  const deleteItem = id => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <Item
              content={`Item: ${item.name}`}
              onDelete={() => deleteItem(item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
