import BookCard from '@components/BookCard';
import { Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import Select from '@components/Select';
import BookCardOri from '@components/BookCardOri';
import React, { useContext, useState, useEffect } from 'react';
import { transBook, getBook, submitComment, deleteBook } from '@services/api';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import {
  ContainerScroll,
  ContainerView,
  TitleText,
  SearchInput,
  ContainerBooksList,
  LoadingIndicator,
  styles,
} from './styles';
import { v4 as uuidv4 } from 'uuid';
import { langs, jinDeer } from './languages';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@contexts/AuthContext';
import { FlatList } from '@components/FlatList';
import Button2 from '@components/Button.js';
import Comment from '@components/Comment.js';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BookDetails = ({ route }) => {
  const { navigate, goBack } = useNavigation();
  const themeContext = useContext(ThemeContext);
  const { user } = useAuth();
  if (!route.params.params.id) {
    goBack();
  }
  console.log('username: ' + user.username);
  console.log(`Book Details uuid: ${route.params.params.id}`);
  const languages: any = [];
  langs.map((lang: string) => {
    languages.push({ label: lang, value: lang });
  });

  useFocusEffect(
    React.useCallback(() => {
      // setIsFocus(!isFocus);
      onBookList();
      onCommentList();
    }, []),
  );
  useEffect(() => {
    (async () => {
      // onBookList();
    })();
  }, []);

  const [lang, setLang] = useState<string>();
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [bookList, setBookList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [commentStr, setCommentStr] = useState();
  const onTranslate = async () => {
    setLoading(true);
    let httpParam = { tarLang: lang, createdBy: 'system_trans' };
    let path = `/book/bookshelf(${route.params.params.id})`;
    console.log('translating id: ', path);
    console.log('translating para: ', httpParam);
    await transBook(httpParam, path)
      .then((result2) => {
        console.log('translated: ', result2.data);
      })
      .catch((error) => {
        error.alert('translate failed.');
      })
      .finally(() => {
        setIsFocus(!isFocus);
        setLoading(false);
        onBookList();
      });
  };
  const onBookList: any = async () => {
    await getBook(
      `/api/bookshelf/?$filter=orig_uuid [eq] '${route.params.params.id}'`,
    )
      .then((result) => {
        console.log('good record count: ', result.data.length);
        setBookList(result.data);
      })
      .catch((error) => {
        console.log('failed loading translated ver', error); //fake
        //setBookList([{ uuid: '', lang: '' }]);
      })
      .finally(() => {});
  };
  const onCommentList: any = async () => {
    await getBook(
      `/api/comment/?$filter=bookid [eq] '${route.params.params.id}'`,
    )
      .then((result) => {
        console.log('good comment count: ', result.data.length);
        setCommentList(result.data);
      })
      .catch((error) => {
        console.log('failed loading comment', error); //fake
        //setBookList([{ uuid: '', lang: '' }]);
      })
      .finally(() => {});
  };
  const onSubmitComment: any = async () => {
    setLoading(true);
    let temp = uuidv4();
    let date = new Date();
    let time = date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
      hour12: true,
    });
    let params = {
      uuid: temp,
      username: user.username,
      boodid: route.params.params.id,
      comment: commentStr,
      created_at: time,
    };

    await submitComment(params)
      .then((result) => {
        console.log('comment submited: ', result.data);
        //setCommentList(result.data);
        setLoading(false);
        onCommentList();
      })
      .catch((error) => {
        console.log('failed post comment', error); //fake
        //setBookList([{ uuid: '', lang: '' }]);
      })
      .finally(() => {});
  };
  const goToBook = (book: any) => {
    console.log('goToBook: ', book.uuid, book.lang);
    let bookId = book.uuid;
    navigate('Reader', { params: { bookId } });
  };
  const ondeleteBook = async () => {
    const bookid2 = route.params.params.id;
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
    <ContainerView>
      <ContainerScroll>
        <TitleText>Book Details</TitleText>
        <BookCardOri
          key={route.params.params.id}
          id={route.params.params.id}
          title={route.params.params.title}
          author={route.params.params.author}
          image={route.params.params.image}
        />
        <Select
          valueField="value"
          labelField="label"
          data={languages}
          placeholder={!isFocus ? 'Select Language' : lang}
          onFocus={() => setIsFocus(true)}
          defaultValue={lang}
          onBlur={() => setIsFocus(false)}
          onValueChange={(item) => {
            setLang(item.value);
            setIsFocus(true);
          }}
        />
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <Button2 mode="outlined" onPress={onTranslate}>
            Translate
          </Button2>
        )}
        <TitleText>Translated Book:</TitleText>
        <TouchableOpacity
          key={route.params.params.id + 'temp'}
          style={styles.rowMenu}
          onPress={() => goToBook({ uuid: route.params.params.id })}>
          <AntDesign name={'book'} />
          <Text style={styles.textMenu} fontSize={16}>
            Original
          </Text>
        </TouchableOpacity>
        {bookList.length > 0
          ? bookList.map((book) => (
              <TouchableOpacity
                key={book.uuid}
                style={styles.rowMenu}
                onPress={() => goToBook(book)}>
                <AntDesign name={'book'} />
                <Text style={styles.textMenu} fontSize={16}>
                  {book.lang}
                </Text>
              </TouchableOpacity>
            ))
          : null}

        <Button2 mode="contained" onPress={ondeleteBook}>
          Delete
        </Button2>
        <TitleText>Comment Section</TitleText>
        <SearchInput
          placeholderTextColor={themeContext.colors.terciary}
          placeholder="Left a Comment"
          onChangeText={(txt) => setCommentStr(txt)}
          value={commentStr}
        />

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <Button2 mode="outlined" onPress={onSubmitComment}>
            submit
          </Button2>
        )}
        {commentList.length > 0
          ? commentList.map((row) => (
              <Comment
                key={row.id}
                created={row.created_at}
                content={row.comment}
                name={row.username}
                avatar={null}
              />
            ))
          : null}
      </ContainerScroll>
    </ContainerView>
  );
};

export default BookDetails;
