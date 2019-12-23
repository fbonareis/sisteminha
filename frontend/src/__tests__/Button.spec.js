import React from 'react';
import { create } from 'react-test-renderer';

function Button() {
  return <button>Nothing to do for now</button>;
}

describe('Button component', () => {
  test('Matches the snapshot', () => {
    const button = create(<Button />);

    console.log(button.toJSON());
    expect(button.toJSON()).toMatchSnapshot();
  });
});
