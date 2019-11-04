import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureMockStore from 'redux-mock-store';
import ProfileCard from '../ProfileCard';

const mockStore = configureMockStore();
const store = mockStore({});

const renderer = new ShallowRenderer();

test('ProfileCard Component', () => {
  const page = renderer.render(
    <Provider store={store}>
      <ProfileCard
        name="Name"
        email="test@buffalo.edu"
        languages={['python', 'javascript', 'c++']}
        onLanguagesChange={value => value}
      />
    </Provider>,
  );
  expect(page).toMatchSnapshot();
});
