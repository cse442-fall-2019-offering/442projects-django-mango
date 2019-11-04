import React from 'react';
import { Provider } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureMockStore from 'redux-mock-store';
import LangMenu from '../LangMenu';

const mockStore = configureMockStore();
const store = mockStore({});

const renderer = new ShallowRenderer();

test('LangMenu Component', () => {
  const page = renderer.render(
    <Provider store={store}>
      <LangMenu
        onLanguagesChange={value => value}
        selectedLanguagegs={['python', 'javascript', 'c++']}
      />
    </Provider>,
  );
  expect(page).toMatchSnapshot();
});
