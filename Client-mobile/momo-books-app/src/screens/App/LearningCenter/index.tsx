import RNFS from 'react-native-fs';
import React, { useContext, useState, Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text2s,
  Button,
} from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { ThemeContext } from 'styled-components/native';
import { askMomo } from '@services/api';
import {
  ContainerScroll,
  ContainerView,
  TitleText,
  SearchInput,
  ContainerBooksList,
  LoadingIndicator,
} from './styles';
import { Text } from 'react-native-paper';
import Button2 from '@components/Button.js';
import { Provider } from 'react-redux';
import Main from '@components/flashCard/Main';

//import { Provider } from 'react-redux';
import { setLocalNotification } from '@utils/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY } from '@utils/constants';
import store from '@components/store';
storeData = async (value) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, value);
  } catch (e) {
    // saving error
    console.log('Error while trying to add item in async storage', e);
  }
};
const LearningCenter = ({ route }) => {
  console.log('LearningCenter screen:', route);
  const themeContext = useContext(ThemeContext);
  const [word, setWord] = useState<string>();
  const [result, setResult] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const onSearch = async () => {
    setLoading(true);
    let pre =
      'you are a dictionary website, give me the short definition of the word .The word is : ';
    let httpParam = {
      ask: pre + word,
    };
    await askMomo(httpParam)
      .then(async (result2) => {
        console.log('asked', result2.data);
        setResult(result2.data.answer);
      })
      .catch((error) => {
        error.alert('ask failed.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  store.subscribe(() => {
    let stateValue = JSON.stringify(store.getState());
    storeData(stateValue);
  });

  return (
    <ContainerView>
      {/* <ContainerScroll>
        <TitleText>LearningCenter</TitleText>
      </Co
      ntainerScroll> */}
      {/* <Main /> */}
    </ContainerView>
  );
};

// import {
//   ContainerScroll,
//   ContainerView,
//   TitleText,
//   SearchInput,
//   ContainerBooksList,
// } from './styles';
// const LearningCenter = ({ route }) => {
//   return (
//     <ContainerView>
//       <ContainerScroll>
//         <TitleText>Testing!</TitleText>
//       </ContainerScroll>
//     </ContainerView>
//   );
// };
export default LearningCenter;
