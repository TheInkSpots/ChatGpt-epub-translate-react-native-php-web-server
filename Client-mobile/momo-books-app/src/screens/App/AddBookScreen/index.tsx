/* eslint-disable @typescript-eslint/no-unused-vars */
import RNFS from 'react-native-fs';
import BookCard from '@components/BookCard';
import React, { useContext, useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
  Switch,
} from 'react-native';
import { ThemeContext } from 'styled-components/native';
import SelectFile from '@components/SelectFile';
import { uploadBook, getBook } from '@services/api';
import {
  ContainerScroll,
  ContainerView,
  TitleText,
  ContainerBooksList,
  SearchInput,
  LoadingIndicator,
} from './styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Text, ToggleButton } from 'react-native-paper';
import TextInput from '@components/TextInput.js';
import Button2 from '@components/Button.js';
import { navigate, useNavigation } from '@react-navigation/native';
const AddBookScreen = ({ route }) => {
  const { navigate, goBack } = useNavigation();
  const themeContext = useContext(ThemeContext);
  const [filePath, setFilePath] = useState<string>();
  const [author, setAuthor] = useState();
  const [name, setName] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [httpParam, setHttpParam] = useState({});
  const [isPublic, setpublic] = useState('0');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState(false);

  console.log('AddBookScreen screen:', route.params.useruuid);
  React.useEffect(() => {
    if (!filePath) {
      return;
    }
    const path = JSON.parse(filePath).uri.replace('file://', '');
    const filename = JSON.parse(filePath).name;
    setIsSelected(true);
    setName(filename);
    readFileExample(path)
      .then((result) => {
        //uploadBook(param);
        const params = {
          filepath: null,
          lang: null,
          author: author,
          name: filename,
          destription: null,
          matadata: null,
          orig_uuid: null,
          created_at: null,
          created_by: route.params.useruuid,
          cate: 'testcate',
          base64Str: result,
          public: 0,
          title: null,
        };
        setHttpParam(params);
        console.log('loaded: ', params.name);
        //onUploadBook(params);
      })
      .catch((err: any) => {
        console.log(err.message, err.code);
      });
  }, [filePath]);

  const onUploadBook: any = async () => {
    setLoading(true);
    const path = JSON.parse(filePath).uri.replace('file://', '');
    const filename = JSON.parse(filePath).name;
    httpParam.author = author;
    httpParam.public = isPublic;
    console.log('Uploading book:', filePath);

    await uploadBook(httpParam)
      .then((result2) => {
        console.log('Uploaded', result2.data);
        setLoading(false);
      })
      .catch((error) => {
        error.alert('update failed.');
      })
      .finally(() => {
        goBack();
      });

    // Example use saveUser():
  };
  const onButtonToggle = () => {
    setpublic(isPublic === '0' ? '1' : '0');
    setIsEnabled((previousState) => !previousState);
  };
  const readFileExample = async (filepath: string) => {
    return await RNFS.readFile(filepath, 'base64');
  };

  return (
    <ContainerView>
      <ContainerScroll>
        <TitleText style={styles.container}>Upload a new book!</TitleText>
        {/* <TouchableOpacity onPress={selectFile}>
          <TitleText>TestingBnt!</TitleText>
        </TouchableOpacity> */}

        {!isSelected ? (
          <SelectFile style={styles.container} setFilePath={setFilePath} />
        ) : (
          <TitleText>book selected</TitleText>
        )}
        <SearchInput
          placeholderTextColor={themeContext.colors.terciary}
          placeholder="Epub file name"
          //onChangeText={(txt) => setAuthor(txt)}
          value={name}
        />
        {isPublic === '0' ? (
          <TitleText>Only in my liberary</TitleText>
        ) : (
          <TitleText>Also In public liberary</TitleText>
        )}
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onButtonToggle}
          value={isEnabled}
        />
        {isSelected ? (
          isLoading ? (
            <LoadingIndicator />
          ) : (
            <Button2 mode="outlined" onPress={onUploadBook}>
              Upload Book
            </Button2>
          )
        ) : null}
        {/* <Button title={'upload'} onPress={onUploadBook} /> */}
      </ContainerScroll>
    </ContainerView>
  );
};

export default AddBookScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
