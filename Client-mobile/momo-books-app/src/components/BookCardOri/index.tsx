import { useNavigation } from '@react-navigation/native';
import { BookCardProps } from '@typings/common';
import React from 'react';

// import {
//   BookTitle,
//   ContainerBookCard,
//   AuthorName,
//   BookCover,
// } from '../BookCard/styles';
import {
  BookTitle,
  ContainerBookCard,
  AuthorName,
  BookCover,
} from './styles.ts';
const BookCardOri = ({ id, title, author, image }: BookCardProps) => {
  const { navigate } = useNavigation();
  //const path = image.toString();
  const goToBook = () => {
    navigate('Reader', {
      //BookDetails
      params: {
        id,
      },
    });
  };
  //console.log('testest123123, ', image);
  //const image123 = require(`@/assets/images/${path}.jpg`);
  return (
    <ContainerBookCard key={id} onPress={goToBook}>
      {
        /* <BookCover source={require('@/assets/images/cover.png')} /> */
        //console.log('testest123123,', path)
      }
      <BookCover source={image} />
      <BookTitle>{title}</BookTitle>
      <AuthorName>{author}</AuthorName>
    </ContainerBookCard>
  );
};

export default BookCardOri;
