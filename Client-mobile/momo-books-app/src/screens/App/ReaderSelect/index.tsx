import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components/native';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Reader, ReaderProvider, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import { navigate, useNavigation } from '@react-navigation/native';
import { ContainerView, styles, BackSvg } from './styles';
import { light, dark, sepia } from './themes';
import RNFS from 'react-native-fs';
import SelectFile from '@components/SelectFile';
import { uploadBook } from '@services/api';
import AntDesign from 'react-native-vector-icons/AntDesign';
const CustomReader = () => {
  const { width, height } = useWindowDimensions();
  const { navigate, goBack } = useNavigation();
  const themeContext = useContext(ThemeContext);
  const searchBook = (e: any) => {
    console.log(e);
  };
  const [bookdata, setBookdata] = useState<string>();
  const [filePath, setFilePath] = useState();
  const [lightingTog, setLightTog] = useState(0);
  React.useEffect(() => {
    if (!filePath) {
      return;
    }

    const path = JSON.parse(filePath).uri.replace('file://', '');

    readFileExample(path)
      .then((result) => {
        //uploadBook(param);
        setBookdata(result);
      })
      .catch((err: any) => {
        console.log(err.message, err.code);
      });
    // call api
  }, [filePath]);

  const readFileExample = async (filepath: string) => {
    return await RNFS.readFile(filepath, 'base64');
  };

  const { changeTheme } = useReader();
  const backLightTog = () => {
    setLightTog(lightingTog + 1);

    if (lightingTog == 0) {
      changeTheme(light);
    } else if (lightingTog == 1) {
      changeTheme(sepia);
    } else {
      changeTheme(dark);
    }
    if (lightingTog > 1) {
      setLightTog(0);
    }
  };

  return (
    <ContainerView>
      <View style={styles.options}>
        <TouchableOpacity onPress={() => goBack()}>
          <BackSvg />
        </TouchableOpacity>
        <SelectFile setFilePath={setFilePath} />

        <TouchableOpacity onPress={() => backLightTog()}>
          <AntDesign name={'bulb1'} size={26} />
        </TouchableOpacity>
      </View>
      {filePath !== undefined ? (
        <Reader
          //src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          src={bookdata}
          //src="/Users/mo1971/Library/Developer/CoreSimulator/Devices/1F0C08B5-993C-4023-9095-42CE0FA5AE88/data/Containers/Data/Application/41791372-7FDB-43D7-824C-F9982C12F5BA/tmp/com.momobooks-Inbox/algorithm_1990.epub"
          width={width}
          height={height * 0.85}
          fileSystem={useFileSystem}
        />
      ) : undefined}
    </ContainerView>
  );
};

export const ReaderSelect = () => (
  <ReaderProvider>
    <CustomReader />
  </ReaderProvider>
);
