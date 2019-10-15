import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureMockStore from 'redux-mock-store';
import Group from '../Group';

const mockStore = configureMockStore();
const store = mockStore({});

const renderer = new ShallowRenderer();

test('Group Page', () => {
  const page = renderer.render(
    <Provider store={store}>
      <Group match={{ params: { groupId: 'abc' } }} />
    </Provider>,
  );
  expect(page).toMatchSnapshot();
});
