import React from 'react';
import renderer from 'react-test-renderer';
import ProfileCard from '../ProfileCard';

test('Group Dashboard Component', () => {
  const component = renderer.create(
    <ProfileCard
      name="Student Name"
      email="testemail@buffalo.edu"
      languages={['python', 'javascript']}
      onLanguagesChange={value => value}
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});
