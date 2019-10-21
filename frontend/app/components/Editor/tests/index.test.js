import React from 'react';
import renderer from 'react-test-renderer';
import ReactMediumEditor from '../ReactMediumEditor';

test('ReactMediumEditor Component', () => {
  const component = renderer.create(
    <ReactMediumEditor
      text="<p>Test</p>"
      onChange={value => value}
      placeholder="Test"
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});
