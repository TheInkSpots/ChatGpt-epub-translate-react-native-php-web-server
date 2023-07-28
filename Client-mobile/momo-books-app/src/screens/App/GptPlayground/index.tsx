import RNFS from 'react-native-fs';
import BookCard from '@components/BookCard';
import React, { useContext, useState, useCallback, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text2s,
  Button,
} from 'react-native';
import { ThemeContext } from 'styled-components/native';
import SelectFile from '@components/SelectFile';
import { uploadBook, getBook, getIPTesting, askMomo } from '@services/api';
import {
  ContainerScroll,
  ContainerView,
  TitleText,
  SearchInput,
  ContainerBooksList,
} from './styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Text } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
const GptPlayground = ({ route }) => {
  const usericon = require('@/assets/images/usericon2.png');
  const themeContext = useContext(ThemeContext);
  const [filePath, setFilePath] = useState();
  console.log('GptPlayground screen:', route);
  const [chatId, setChatId] = useState();
  const [messages, setMessages] = useState([]);
  var all = [];
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    loadStorageData();
  }, []);
  const loadStorageData = async () => {
    const chatCached = await AsyncStorage.getItem('chat:data');
    if (chatCached) {
      //await AsyncStorage.removeItem('chat:data');
      await setMessages(JSON.parse(chatCached).reverse());
      all = JSON.parse(chatCached);
    } else {
      setMessages([
        {
          _id: 1,
          text: 'What can I help you ?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: usericon,
          },
        },
      ]);
    }

    setLoading(false);
  };
  const onSend = useCallback(async (message = []) => {
    let uuid = uuidv4();
    message[0]._id = uuid;
    console.log('user ask: ', message[0].text);
    all.push(message[0]);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message),
    );
    let httpParam = {
      ask: message[0].text,
    };
    await askMomo(httpParam)
      .then(async (result2) => {
        console.log('asked', result2.data);
        let temp = {
          _id: result2.data.id,
          text: result2.data.answer,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: usericon,
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, temp),
        );
        all.push(temp);
        console.log('all: ', all);
        await AsyncStorage.setItem('chat:data', JSON.stringify(all));
      })
      .catch((error) => {
        error.alert('ask failed.');
      })
      .finally(() => {});
    console.log('asysnc saved messages');
  }, []);

  return (
    <ContainerView>
      <GiftedChat
        messages={messages}
        onSend={(message) => onSend(message)}
        user={{
          _id: 1,
        }}
      />
    </ContainerView>
  );
};

export default GptPlayground;
