import React from 'react';
import { StatusBar, StyleSheet, useWindowDimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '@screens/App/Home';
import BookDetails from '@screens/App/BookDetails';
//import DrawerContent from '@screens/App/DrawerContent';
import TestingScreen from '@screens/App/TestingScreen';
import Menu from '@screens/App/Menu';
import Bookstore from '@screens/App/Bookstore';
import AddBookScreen from '@screens/App/AddBookScreen';
import GptPlayground from '@screens/App/GptPlayground';
import Dictionary from '@screens/App/Dictionary';
import LearningCenter from '@screens/App/LearningCenter';

import { AppStackRouter } from '@typings/routes';

import theme from '@theme/index';

import UploadIcon from '@components/UploadInput';
import NavigateBnt from '@components/NavigateBnt';
import { MomoReader } from '@screens/App/Reader';
import { ReaderSelect } from '@screens/App/ReaderSelect';
// import { DrawerContent } from './';

const AppStack = createNativeStackNavigator<AppStackRouter>();

export default ({ uuid }: any) => {
  console.log('routes AppNavigator:', uuid);
  return (
    <AppStack.Navigator initialRouteName="DrawerContent">
      <AppStack.Screen
        name="Home"
        component={Home}
        options={() => ({
          animation: 'slide_from_right',
          headerShown: true,
          headerTitle: '',
          headerBackVisible: false,
          headerRight: () => <NavigateBnt />,
          //headerLeft: () => <NavigateBnt />,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: theme.colors.light.backgroundLight,
          },
        })}
      />
      <AppStack.Screen
        name="Reader"
        component={MomoReader}
        options={() => ({
          animation: 'slide_from_right',
          headerShown: false,
          headerBackVisible: false,
          headerRight: () => <UploadIcon />,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: theme.colors.light.backgroundLight,
          },
        })}
      />
      <AppStack.Screen
        name="ReaderSelect"
        component={ReaderSelect}
        options={() => ({
          animation: 'slide_from_right',
          headerShown: false,
          headerBackVisible: false,
          headerRight: () => <UploadIcon />,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: theme.colors.light.backgroundLight,
          },
        })}
      />
      <AppStack.Screen
        name="BookDetails"
        component={BookDetails}
        options={() => ({
          animation: 'slide_from_right',
          headerShown: true,
          headerTitle: '',
          headerBackVisible: false,
          //headerRight: () => <UploadIcon />,
          //headerLeft: () => <UploadIcon />,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: theme.colors.light.backgroundLight,
          },
        })}
      />
      <AppStack.Screen
        name="TestingScreen"
        component={TestingScreen}
        options={() => ({
          animation: 'slide_from_right',
          headerShown: true,
          headerTitle: '',
          headerBackVisible: false,
          // headerRight: () => <UploadIcon />,
          headerLeft: () => <UploadIcon />,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: theme.colors.light.backgroundLight,
          },
        })}
      />
      <AppStack.Screen
        name="Menu"
        component={Menu}
        options={() => ({
          animation: 'slide_from_right',
          headerShown: true,
          headerTitle: '',
          headerBackVisible: false,
          // headerRight: () => <UploadIcon />,
          //headerLeft: () => <UploadIcon />,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: theme.colors.light.backgroundLight,
          },
        })}
      />
      <AppStack.Screen
        name="Bookstore"
        component={Bookstore}
        options={() => ({
          animation: 'slide_from_right',
          headerShown: true,
          headerTitle: '',
          headerBackVisible: false,
          headerRight: () => <NavigateBnt />,
          //headerLeft: () => <UploadIcon />,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: theme.colors.light.backgroundLight,
          },
        })}
      />
      <AppStack.Screen
        name="AddBookScreen"
        component={AddBookScreen}
        options={() => ({
          animation: 'slide_from_right',
          headerShown: true,
          headerTitle: '',
          headerBackVisible: false,
          headerRight: () => <NavigateBnt />,
          //headerLeft: () => <UploadIcon />,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: theme.colors.light.backgroundLight,
          },
        })}
      />
      <AppStack.Screen
        name="GptPlayground"
        component={GptPlayground}
        options={() => ({
          animation: 'slide_from_right',
          headerShown: true,
          headerTitle: '',
          headerBackVisible: false,
          headerRight: () => <NavigateBnt />,
          //headerLeft: () => <UploadIcon />,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: theme.colors.light.backgroundLight,
          },
        })}
      />

      <AppStack.Screen
        name="Dictionary"
        component={Dictionary}
        options={() => ({
          animation: 'slide_from_right',
          headerShown: true,
          headerTitle: '',
          headerBackVisible: false,
          headerRight: () => <NavigateBnt />,
          //headerLeft: () => <UploadIcon />,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: theme.colors.light.backgroundLight,
          },
        })}
      />
      <AppStack.Screen
        name="LearningCenter"
        component={LearningCenter}
        options={() => ({
          animation: 'slide_from_right',
          headerShown: true,
          headerTitle: '',
          headerBackVisible: false,
          headerRight: () => <NavigateBnt />,
          //headerLeft: () => <UploadIcon />,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: theme.colors.light.backgroundLight,
          },
        })}
      />
    </AppStack.Navigator>
  );
};
