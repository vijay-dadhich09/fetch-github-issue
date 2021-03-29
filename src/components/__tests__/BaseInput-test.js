import React from 'react';
import { TextInput } from 'react-native';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import BaseInput from '../BaseInput';

describe('Header test', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <BaseInput label="Enter Author name">
          <TextInput
            accessibilityLabel="input values"
            style={{}}
            onChangeText={jest.fn()}
            value=""
            autoCapitalize="none"
          />
        </BaseInput>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Labels', () => {
    const { getByText } = render(
      <BaseInput label="Enter Author name">
      <TextInput
        accessibilityLabel="input values"
        style={{}}
        onChangeText={jest.fn()}
        value=""
        autoCapitalize="none"
      />
    </BaseInput>
    );
    expect(getByText('Enter Author name')).toHaveTextContent('Enter Author name');
  });
});
