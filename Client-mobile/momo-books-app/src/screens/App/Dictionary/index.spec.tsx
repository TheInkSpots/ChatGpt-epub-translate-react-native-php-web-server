import React from 'react';

import { act, cleanup, render } from '@testing-library/react-native';

import { alertSpy } from '@tests/actions/alertSpy';
import { mockedNavigate } from '@tests/mocks/rnNavigation';

import MockedNavigator from '@routes/MockedNavigator';

import TestingScreen from './index';

jest.mock('@services/api');

describe('Dictionary Screen', () => {
  afterEach(() => {
    cleanup();
    alertSpy.mockClear();
    mockedNavigate.mockClear();
  });

  beforeEach(() => {
    cleanup();
  });

  it('should render correctly', async () => {
    render(<MockedNavigator component={TestingScreen} />);
    await act(async () => {});
  });
});
