import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureMockStore from 'redux-mock-store';
import Login from '../Login';

const mockStore = configureMockStore();
const store = mockStore({});

const renderer = new ShallowRenderer();

test('Login Page', () => {
  const page = renderer.render(
    <Provider store={store}>
      <Login />
    </Provider>,
  );
  expect(page).toMatchSnapshot();
});
