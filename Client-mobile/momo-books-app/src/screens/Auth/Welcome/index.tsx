import React from 'react';
import {
  AppNameText,
  ButtonGroup,
  ContainerScroll,
  ContainerView,
  LoginButton,
  TitleText,
  SubTitleText,
  RegisterButton,
  WelcomeSvg,
} from './styles';

const Welcome = ({ navigation }) => {
  const goToPage = (page: string) => {
    navigation.navigate(page, {});
  };

  return (
    <ContainerView>
      <ContainerScroll>
        <AppNameText>GPT-epub</AppNameText>
        <WelcomeSvg />
        <TitleText>EBook Ai Translate.</TitleText>
        <SubTitleText>
          Using GPT language model to translate your ebooks! Even 5-year-old can
          understand.
        </SubTitleText>
        <ButtonGroup>
          <LoginButton onPress={() => goToPage('Login')}>Login</LoginButton>
          <RegisterButton onPress={() => goToPage('Register')}>
            Register
          </RegisterButton>
        </ButtonGroup>
      </ContainerScroll>
    </ContainerView>
  );
};

export default Welcome;
