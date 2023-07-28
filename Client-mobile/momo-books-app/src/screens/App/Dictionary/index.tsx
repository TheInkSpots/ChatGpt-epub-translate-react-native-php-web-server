import RNFS from 'react-native-fs';
import BookCard from '@components/BookCard';
import React, { useContext, useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text2s,
  Button,
} from 'react-native';
import { ThemeContext } from 'styled-components/native';
import SelectFile from '@components/SelectFile';
import { uploadBook, getBook, getIPTesting, askMomo } from '@services/api';
import {
  ContainerScroll,
  ContainerView,
  TitleText,
  SearchInput,
  ContainerBooksList,
  LoadingIndicator,
} from './styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Text } from 'react-native-paper';
import Button2 from '@components/Button.js';
const TestingScreen = ({ route }) => {
  console.log('Dictionary screen:', route);
  const themeContext = useContext(ThemeContext);
  const [word, setWord] = useState<string>();
  const [result, setResult] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const onSearch = async () => {
    setLoading(true);
    let pre =
      'you are a dictionary website, give me the definition of the word for each meaning, and give me 2 example sentenses for each meanings of the word. The word is : ';
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
  return (
    <ContainerView>
      <ContainerScroll>
        <TitleText>Dictionary</TitleText>

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <SearchInput
            multiline
            label=""
            placeholderTextColor={themeContext.colors.terciary}
            placeholder=""
            //onChangeText={(txt) => setWord(txt)}
            value={result}
          />
        )}
        <SearchInput
          placeholderTextColor={themeContext.colors.terciary}
          placeholder="search any word in the dictionary"
          onChangeText={(txt) => setWord(txt)}
          value={word}
        />
        <Button2 mode="outlined" onPress={onSearch}>
          search word
        </Button2>
      </ContainerScroll>
    </ContainerView>
  );
};

export default TestingScreen;
