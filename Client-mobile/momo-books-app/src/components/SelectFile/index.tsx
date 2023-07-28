import React from 'react';
import { useEffect } from 'react';
import { UploadSvgBig } from './styles';
import { TouchableOpacity, Text } from 'react-native';
import DocumentPicker, { isInProgress } from 'react-native-document-picker';

interface ISelectFile {
  uri: string;
  size: string;
  name: string;
}

const SelectFile = ({ setFilePath }: any) => {
  // const [result, setResult] = React.useState<
  //   Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  // >();
  const [uri, setUri] = React.useState<ISelectFile>();
  // useEffect(() => {
  //   console.log(JSON.stringify(result, null, 2));
  // }, [result]);
  useEffect(() => {
    if (!uri) {
      return;
    }
    console.log(JSON.stringify(uri));
    setFilePath(JSON.stringify(uri));
  }, [uri, setFilePath]);

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const selectFile = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      // setResult([pickerResult]);

      console.log('set uri');
      setUri(pickerResult);
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <TouchableOpacity onPress={selectFile}>
      <UploadSvgBig />
      {/* <Text selectable>Result: {JSON.stringify(result, null, 2)}</Text> */}
      {/* <Text selectable>URL: {uri?.uri}</Text> */}
    </TouchableOpacity>
  );
};

export default SelectFile;
