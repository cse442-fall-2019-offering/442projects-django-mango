import React from 'react';
import renderer from 'react-test-renderer';
import ProfileCard from '../ProfileCard';

test('Group Dashboard Component', () => {
  const component = renderer.create(
    <ProfileCard
      name="Name"
      email="testemail@buffal.edu"
      languages={['python', 'javascript', 'c++']}
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});
