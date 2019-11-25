import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Login from '../Login';

const renderer = new ShallowRenderer();

test('Login Page', () => {
  const page = renderer.render(<Login />);
  expect(page).toMatchSnapshot();
});
