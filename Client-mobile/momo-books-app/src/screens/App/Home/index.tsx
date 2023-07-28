/* eslint-disable @typescript-eslint/no-unused-vars */
import BookCard from '@components/BookCard';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { getBook } from '@services/api';
import {
  ContainerScroll,
  ContainerView,
  TitleText,
  SearchInput,
  ContainerBooksList,
} from './styles';
import {
  harryPotter,
  jinShootBird,
  jinLauth,
  detecKiller,
  leoWar,
  jinDeer,
  books,
} from './bookcover';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@contexts/AuthContext';

const Home = () => {
  const { navigate, goBack } = useNavigation();
  const { user } = useAuth();
  const useruuid = user.idToken;
  // if (user.idToken == null) {
  //   console.log('Not in AuthContext');
  //   //await deleteUser();
  // }
  console.log('Home uuid: ', user.idToken);
  //Icon.loadFont();

  const [bookList, setBookList] = useState([]);
  const [trigger, setTrigger] = useState();
  const [searchWord, setsearchWord] = useState<string>();

  useFocusEffect(
    React.useCallback(() => {
      //setTrigger(!trigger);
      onBookList();
    }, []),
  );
  useEffect(() => {
    (async () => {
      // onBookList();
    })();
  }, []);

  const themeContext = useContext(ThemeContext);
  const onBookList: any = async () => {
    await getBook(`/api/bookshelf/?$filter=created_by [eq] '${useruuid}'`)
      .then((result) => {
        console.log('good record count: ', result.data.length);
        setBookList(result.data);
      })
      .catch((error) => {
        console.log('loading booklist failed'); //fake
      })
      .finally(() => {});
  };
  const onSearchBook: any = async (word: string) => {
    console.log('Searching', word);
    setsearchWord(word);

    if (word !== null && word !== undefined && word !== '') {
      //setBookList([]);
      await getBook(
        `/api/bookshelf/?$filter=created_by [eq] '${useruuid}' [and] author [like] '%${word}%'`,
      )
        .then((result) => {
          if (result.data.length !== 0) {
            setBookList(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    } else {
      console.log('word is null');
      onBookList();
    }
  };

  return (
    <ContainerView>
      <ContainerScroll>
        <TitleText>My Library</TitleText>
        <SearchInput
          placeholderTextColor={themeContext.colors.terciary}
          placeholder="Search Books"
          icon="magnify"
          value={searchWord}
          onChangeText={(txt) => setsearchWord(txt)}
          onPressIcon={() => {
            onSearchBook(searchWord);
          }}
        />

        <ContainerBooksList>
          {console.log('render:', bookList.length)}
          {bookList.length > 0
            ? bookList.map(({ uuid, name, cate, author, title }) => (
                //const name2 = row.name.replace('.epub', '');
                <BookCard
                  key={uuid}
                  id={uuid}
                  title={title}
                  author={author}
                  image={jinDeer}
                  description={cate}
                />
              ))
            : null}
        </ContainerBooksList>
        <TitleText>Recommendation</TitleText>

        <ContainerBooksList>
          {books.map(({ id, title, author, image, description }) => (
            <BookCard
              key={id}
              id={id}
              title={title}
              author={author}
              image={image}
              description={description}
            />
          ))}
        </ContainerBooksList>
      </ContainerScroll>
      <TouchableOpacity
        onPress={() => {
          // setEditModalOpen(true);
          navigate('AddBookScreen', { useruuid });
        }}
        activeOpacity={0.6}
        style={{ position: 'absolute', bottom: 40, right: 30, zIndex: 1 }}>
        <Icon name="pluscircle" size={52} color={'#d60265'} />
      </TouchableOpacity>
    </ContainerView>
  );
};

export default Home;
