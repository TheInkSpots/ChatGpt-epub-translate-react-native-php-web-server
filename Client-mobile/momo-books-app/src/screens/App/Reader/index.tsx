import React, { useContext, useState, useEffect } from 'react';
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
import {
  navigate,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import { ContainerView, styles, BackSvg, LoadingIndicator } from './styles';
import { light, dark, sepia } from './themes';
import RNFS from 'react-native-fs';
import SelectFile from '@components/SelectFile';
import { getTheBookBase64 } from '@services/api';
import AntDesign from 'react-native-vector-icons/AntDesign';
const CustomReader = ({ booId }) => {
  console.log('reader : ', booId);
  const { width, height } = useWindowDimensions();
  const { navigate, goBack } = useNavigation();

  const [lightingTog, setLightTog] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [base64, setBase64] = useState();
  const { changeTheme } = useReader();

  useFocusEffect(
    React.useCallback(() => {
      // setIsFocus(!isFocus);
      //onGetBook();
    }, []),
  );
  useEffect(() => {
    onGetBook();
  }, []);
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

  let url = `/book/bookshelf(${booId})`;
  //console.log('getting ba64 url:', url);
  const onGetBook = async () => {
    await getTheBookBase64(url)
      .then((result2) => {
        setBase64(result2.data.base64Str);
        console.log('geted base64');
        //setLoading(false);
      })
      .catch((error) => {
        error.alert('get failed.');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <ContainerView>
      <View style={styles.options}>
        <TouchableOpacity onPress={() => goBack()}>
          <BackSvg />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => backLightTog()}>
          <AntDesign name={'bulb1'} size={26} />
        </TouchableOpacity>
      </View>
      {!isLoading ? (
        <Reader
          src={base64}
          width={width}
          height={height * 0.85}
          fileSystem={useFileSystem}
        />
      ) : (
        <LoadingIndicator />
      )}
    </ContainerView>
  );
};

export const MomoReader = ({ route }) => (
  <ReaderProvider>
    <CustomReader booId={route.params.params.bookId} />
  </ReaderProvider>
);
