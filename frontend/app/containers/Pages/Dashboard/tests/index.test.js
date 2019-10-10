import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureMockStore from 'redux-mock-store';
import Dashboard from '../Dashboard';

const mockStore = configureMockStore();
const store = mockStore({});

const renderer = new ShallowRenderer();

test('Dashboard Page', () => {
  const page = renderer.render(
    <Provider store={store}>
      <Dashboard />
    </Provider>,
  );
  expect(page).toMatchSnapshot();
});
