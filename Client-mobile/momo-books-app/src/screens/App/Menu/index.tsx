import RNFS from 'react-native-fs';
import BookCard from '@components/BookCard';
import React, { useContext, useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text2s,
  Button,
  useWindowDimensions,
  Image,
  ViewStyle,
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

import { DrawerActions, NavigationState } from '@react-navigation/native';
import { useAuth } from '@contexts/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyPressable from '@components/MyPressable';
import { AppImages } from '@assets/index';
import { useNavigation } from '@react-navigation/native';
const Menu = ({ route }) => {
  const { user, deleteUser } = useAuth();
  // const { deleteUser } = useAuth();
  const { navigate } = useNavigation();
  const logout = async () => {
    await deleteUser();
  };
  const DRAWER_SCENES = [
    { label: 'Home', icon: 'home', routeKey: 'Home' },
    {
      label: 'Public Book Shelf',
      icon: 'group',
      routeKey: 'Bookstore',
    },
    // {
    //   label: 'Language Learning center',
    //   icon: AppImages.support_icon,
    //   isAssetIcon: true,
    //   routeKey: 'LearningCenter',
    // },
    {
      label: 'Dictionary',
      icon: 'collections-bookmark',
      routeKey: 'Dictionary',
    },
    {
      label: 'GPT Playground',
      icon: AppImages.support_icon,
      isAssetIcon: true,
      routeKey: 'GptPlayground',
    },
    { label: 'Read Local Book', icon: 'cloud-off', routeKey: 'ReaderSelect' },
  ];

  const getActiveRouteState = (
    routes: NavigationState['routes'],
    index: number,
    routeKey: string,
  ) => routes[index].name.toLowerCase().indexOf(routeKey?.toLowerCase()) >= 0;

  const DrawerItemRow: React.FC = (props) => {
    const {
      state,
      label,
      icon,
      isAssetIcon = false,
      routeKey,
      bgAnimStyle,
    } = props;

    const window = useWindowDimensions();
    const rowWidth = (window.width * 0.75 * 80) / 100;

    return (
      <MyPressable
        style={styles.drawerRowStyle}
        touchOpacity={0.6}
        onPress={() => (routeKey ? navigate(routeKey) : null)}>
        <View
          style={[
            styles.drawerRowbackViewStyle,
            {
              width: rowWidth,
            },
            bgAnimStyle,
          ]}
        />
        <View style={styles.drawerRowContentContainer}>
          {isAssetIcon ? (
            <Image
              source={icon}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          ) : (
            <Icon name={icon} size={24} />
          )}
          <Text numberOfLines={1} style={[styles.drawerRowTextStyle]}>
            {label}
          </Text>
        </View>
      </MyPressable>
    );
  };

  console.log('menu screen:', route);

  return (
    <ContainerView>
      <View style={{ padding: 10, marginTop: 10 }}>
        <View style={[styles.drawerAvatarStyle, styles.avatarShadow]}>
          <Image
            style={styles.drawerAvatarStyle}
            source={AppImages.userImage}
          />
        </View>
        <Text style={styles.userName}>{user.username}</Text>
      </View>
      <View style={styles.divider} />

      <ContainerScroll>
        {DRAWER_SCENES.map((scene) => (
          <DrawerItemRow key={scene.label} {...{ ...scene }} />
        ))}
      </ContainerScroll>

      <MyPressable onPress={logout} style={styles.signOutBtnStyle}>
        <Text style={styles.signOutText}>Sign Out</Text>
        <Icon name="power-settings-new" size={20} color="red" />
      </MyPressable>
    </ContainerView>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontSize: 20,

    paddingTop: 10,
    paddingLeft: 22,
  },
  drawerRowStyle: {
    marginHorizontal: 0,
    paddingVertical: 8,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  drawerRowbackViewStyle: {
    opacity: 0.3,
    height: 48,
    borderRadius: 24,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
  },
  drawerRowTextStyle: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  drawerRowContentContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingHorizontal: 16,
    position: 'absolute',
  },
  drawerAvatarStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarShadow: {
    backgroundColor: 'white',
    elevation: 24,
    shadowColor: '#3A5160',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  divider: {
    backgroundColor: 'darkgrey',
    height: StyleSheet.hairlineWidth,
  },
  signOutBtnStyle: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'darkgrey',
  },
  signOutText: {
    flex: 1,
    color: 'black',
    fontSize: 16,
  },
});

export default Menu;
