import React from 'react';
import { useEffect } from 'react';
import { UploadSvgBig } from './styles';
import { TouchableOpacity, Text } from 'react-native';
import DocumentPicker, { isInProgress } from 'react-native-document-picker';
import { deleteBook } from '@services/api';
interface ISelectFile {
  uri: string;
  size: string;
  name: string;
}
import { useNavigation } from '@react-navigation/native';
const DeleteOriBookBnt = ({ bookid }: any) => {
  const { navigate, goBack } = useNavigation();
  const [uri, setUri] = React.useState<ISelectFile>();

  const ondeleteBook = async (bookid2: string) => {
    console.log(bookid2, 'deleting book');
    await deleteBook(`/api/bookshelf(${bookid2})`)
      .then((result) => {
        console.log('deleteed record: ', result.data);
        goBack();
      })
      .catch((error) => {
        console.log('erroe delte vook ', error); //fake
        //setBookList([{ uuid: '', lang: '' }]);
      })
      .finally(() => {});
  };

  return (
    <TouchableOpacity onPress={ondeleteBook(bookid)}>
      <UploadSvgBig />
      {/* <Text selectable>Result: {JSON.stringify(result, null, 2)}</Text> */}
      {/* <Text selectable>URL: {uri?.uri}</Text> */}
    </TouchableOpacity>
  );
};

export default DeleteOriBookBnt;
