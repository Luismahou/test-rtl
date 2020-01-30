import React from 'react';
import range from 'lodash/range';

const PageView = ({ content }) => <div>{content}</div>;

export const PageContainer = ({ numPages }) => {
  const [currentPosition, setCurrentPosition] = React.useState(0);

  const onPrev = () => {
    setCurrentPosition(Math.max(0, currentPosition - 1));
  };
  const onNext = () => {
    setCurrentPosition(Math.min(numPages - 1, currentPosition + 1));
  };

  return (
    <div>
      <button onClick={onPrev}>Prev</button>
      <button onClick={onNext}>Next</button>
      <ul>
        {range(numPages).map(index => (
          <li
            key={index}
            aria-hidden={index !== currentPosition}
            style={{ opacity: index === currentPosition ? 1 : 0 }}
          >
            <PageView content={`Page ${index}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};
