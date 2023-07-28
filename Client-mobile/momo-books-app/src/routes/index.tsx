import React from 'react';

import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@contexts/AuthContext';

import SplashScreen from '@screens/SplashScreen';

import { PrimaryStatusBar } from '@theme/common';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

export default () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  const hideSplashScreen = () => {
    setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 1000);
  };

  console.log(
    'routes index.ts uuid:',
    user.idToken,
    'isAuthented:',
    isAuthenticated,
  );

  return (
    <NavigationContainer onReady={hideSplashScreen}>
      <PrimaryStatusBar />
      {isLoading ? (
        <SplashScreen />
      ) : (
        <>
          {isAuthenticated ? (
            <AppNavigator uuid={user.idToken} />
          ) : (
            <AuthNavigator />
          )}
        </>
      )}
    </NavigationContainer>
  );
};
