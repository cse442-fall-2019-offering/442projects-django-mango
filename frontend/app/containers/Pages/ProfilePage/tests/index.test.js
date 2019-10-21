import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureMockStore from 'redux-mock-store';
import Profile from '../Profile';

const mockStore = configureMockStore();
const store = mockStore({});

const renderer = new ShallowRenderer();

test('Profile Page', () => {
  const page = renderer.render(
    <Provider store={store}>
      <Profile />
    </Provider>,
  );
  expect(page).toMatchSnapshot();
});
