import React from 'react'
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer';

import Home from '../Home';
import store from '../../../redux'

fetch = jest.fn(() => Promise.resolve());

describe('With React Testing Library', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Provider store={store}><Home /></Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders title', () => {
    const mockFn = jest.fn();
    const props = {
      orgs:"",
      author: "",
      repo: ""
    }
    const { getAllByA11yLabel, getByText } = render(<Provider store={store}><Home {...props} onSearchHandler={mockFn}/></Provider>);
    expect(getByText('Enter Organization name')).toHaveTextContent('Enter Organization name');
    expect(getByText('Enter Repo name')).toHaveTextContent('Enter Repo name');
    expect(getByText('Enter Author name')).toHaveTextContent('Enter Author name');
    expect(getByText('Search')).toHaveTextContent('Search');
    const inputValues = getAllByA11yLabel('input values');
    fireEvent.changeText(inputValues[0], 'microsoft');
    fireEvent.changeText(inputValues[1], 'CBL-Mariner');
    fireEvent.changeText(inputValues[2], 'jslobodzian');
    fireEvent.press(getByText('Search'));
  });
})
