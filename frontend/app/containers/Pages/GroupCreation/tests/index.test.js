import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureMockStore from 'redux-mock-store';
import GroupCreation from '../GroupCreation';

const mockStore = configureMockStore();
const store = mockStore({});

const renderer = new ShallowRenderer();

test('Group Creation Page', () => {
  const page = renderer.render(
    <Provider store={store}>
      <GroupCreation />
    </Provider>,
  );
  expect(page).toMatchSnapshot();
});
