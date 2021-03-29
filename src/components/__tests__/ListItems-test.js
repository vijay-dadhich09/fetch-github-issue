import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import ListItems from '../ListItems';
import { ISSUES_DATA } from '../../mock'

describe('Listitem test', () => {
  const props = ISSUES_DATA;
  it('renders correctly', () => {
    const tree = renderer
      .create(<ListItems {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders title', () => {
    const { getAllByA11yLabel, getByText } = render(<ListItems {...props} />);
    expect(getByText('List of Issues')).toHaveTextContent('List of Issues');
    expect(getByText('Automatic update of the `kubernetes` packages.')).toHaveTextContent('Automatic update of the `kubernetes` packages.');
    expect(getByText('Page 1 of 1')).toHaveTextContent('Page 1 of 1');
    expect(getByText('next')).toHaveTextContent('next');
    fireEvent.press(getByText('next'));
  });
});
