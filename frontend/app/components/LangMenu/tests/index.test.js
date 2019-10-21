import React from 'react';
import renderer from 'react-test-renderer';
import LangMenu from '../LangMenu';

test('LangMenu Component', () => {
  const component = renderer.create(
    <LangMenu
      onLanguagesChange={value => value}
      selectedLanguagegs={['python', 'javascript', 'c++']}
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});
