import React from 'react';
import { useEffect } from 'react';
import { UploadSvg } from './styles';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const NavigateBnt = () => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigate('Menu')}>
      <Icon name="dehaze" size={40} />
    </TouchableOpacity>
  );
};

export default NavigateBnt;
