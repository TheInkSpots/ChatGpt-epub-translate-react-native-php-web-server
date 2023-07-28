import React from 'react';

import { act, cleanup, render } from '@testing-library/react-native';

import { alertSpy } from '@tests/actions/alertSpy';
import { mockedNavigate } from '@tests/mocks/rnNavigation';

import MockedNavigator from '@routes/MockedNavigator';

import AddBookScreen from './index';

jest.mock('@services/api');

describe('AddBookScreen Screen', () => {
  afterEach(() => {
    cleanup();
    alertSpy.mockClear();
    mockedNavigate.mockClear();
  });

  beforeEach(() => {
    cleanup();
  });

  it('should render correctly', async () => {
    render(<MockedNavigator component={AddBookScreen} />);
    await act(async () => {});
  });
});
