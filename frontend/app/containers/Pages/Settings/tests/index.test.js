import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureMockStore from 'redux-mock-store';
import Settings from '../Settings';

const mockStore = configureMockStore();
const store = mockStore({});

const renderer = new ShallowRenderer();

test('Settings Page', () => {
  const page = renderer.render(
    <Provider store={store}>
      <Settings />
    </Provider>,
  );
  expect(page).toMatchSnapshot();
});
