import React from 'react';
import renderer from 'react-test-renderer';
import Group from '../Group';

test('Group Dashboard Component', () => {
  const component = renderer.create(
    <Group
      group={[
        '1E3r5g',
        'Django Mango',
        ['python', 'javascript'],
        ['test1@buffalo.edu', 'test2@buffalo.edu'],
      ]}
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});
