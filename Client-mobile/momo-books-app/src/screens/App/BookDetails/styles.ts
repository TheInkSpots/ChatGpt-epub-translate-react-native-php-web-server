import styled from 'styled-components/native';

import { Text } from 'react-native-paper';

import InputComponent from '@components/Input';

import Logo from '@assets/svg/logo.svg';

import {
  ContainerView as ContainerViewComponent,
  ContainerScroll as ContainerScrollComponent,
  LoadingIndicator as LoadingIndicatorComponent,
} from '@theme/common';

import dimensions from '@theme/dimensions';
import { ScrollView } from 'react-native';

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1 },
  imgBackground: {
    width: '100%',
    height: 250,
  },
  wrap: {
    marginTop: 64,
  },
  avatarImg: {
    borderRadius: 50,
  },
  name: {
    // fontSize: scale(20),
    color: 'white',
    fontWeight: 'bold',
  },
  wrapMenu: {
    flex: 1,
    marginTop: 12,
    marginHorizontal: 12,
    marginBottom: 55,
  },
  rowMenu: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: '#F8F8FF',
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  textMenu: {
    marginHorizontal: 8,
  },
});

export const ContainerScroll = styled(ContainerScrollComponent)``;
export const LoadingIndicator = styled(LoadingIndicatorComponent)``;
export const ContainerView = styled(ContainerViewComponent)`
  align-items: center;
  padding-top: 100px;
  padding-left: ${dimensions.marginHorizontal}px;
  padding-right: ${dimensions.marginHorizontal}px;
`;

export const ContainerBooksList = styled(ScrollView).attrs({
  horizontal: true,
  contentContainerStyle: {
    justifyContent: 'space-between',
  },
})`
  margin-top: 32px;
  width: 100%;
  flex-direction: row;
  overflow-x: visible;
`;

export const TitleText = styled(Text)`
  margin-top: 10px;
  margin-bottom: 15px;
  width: 100%;
  font-size: 32px;
  font-weight: normal;
`;

export const SearchInput = styled(InputComponent)`
  margin-top: 16px;
  align-self: center;
  width: 90%;
`;

export const LogoSvg = styled(Logo).attrs({
  width: '100%',
  preserveAspectRatio: 'xMidYMid',
})`
  margin-top: 10px;
`;
