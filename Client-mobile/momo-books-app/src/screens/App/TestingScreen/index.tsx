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
import { uploadBook, getBook, getIPTesting } from '@services/api';
import {
  ContainerScroll,
  ContainerView,
  TitleText,
  SearchInput,
  ContainerBooksList,
} from './styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Text } from 'react-native-paper';

const TestingScreen = ({ route }) => {
  const themeContext = useContext(ThemeContext);
  const [filePath, setFilePath] = useState();
  console.log('testing screen:', route.params.uuid);
  React.useEffect(() => {
    if (!filePath) {
      return;
    }

    const path = JSON.parse(filePath).uri.replace('file://', '');
    const filename = JSON.parse(filePath).name;
    readFileExample(path)
      .then((result) => {
        //uploadBook(param);
        const params = {
          filepath: null,
          lang: null,
          author: null,
          name: filename,
          destription: null,
          matadata: null,
          orig_uuid: null,
          created_at: null,
          created_by: 'testinguser',
          cate: 'testcate',
          base64Str: result,
        };
        getIPTesting();
        onUploadBook(params);
      })
      .catch((err: any) => {
        console.log(err.message, err.code);
      });
    // call api

    //const a = getIPTestingOri('test');
    //console.log('a:', JSON.stringify(a.data));
  }, [filePath]);

  const onUploadBook: any = async (params: any) => {
    await uploadBook(params)
      .then((result) => {
        console.log('Uploaded', result.data);
      })
      .catch((error) => {
        error.alert('update failed.');
      })
      .finally(() => {});

    // Example use saveUser():
  };

  const readFileExample = async (filepath: string) => {
    return await RNFS.readFile(filepath, 'base64');
  };

  return (
    <ContainerView>
      <ContainerScroll>
        <TitleText>Testing!</TitleText>
        {/* <TouchableOpacity onPress={selectFile}>
          <TitleText>TestingBnt!</TitleText>
        </TouchableOpacity> */}
        <TitleText>Catergory</TitleText>
        <SelectFile onSelected={setFilePath} />
        <BookCard
          id={'title'}
          title={'title'}
          author={'author'}
          image={''}
          description={'description'}
        />
        <TitleText>{}</TitleText>
        <ContainerBooksList />
      </ContainerScroll>
    </ContainerView>
  );
};

export default TestingScreen;
