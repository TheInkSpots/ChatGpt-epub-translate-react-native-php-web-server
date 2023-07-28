import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function Comment({ created, content, name, avatar }) {
  const usericon = require('@/assets/images/usericon.png');
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          resizeMode="contain"
          style={styles.avatar}
          // source={{ uri: avatar }}
          source={usericon}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text>
          <Text style={[styles.text, styles.name]}>{name}</Text>{' '}
          <Text style={styles.text}>{content}</Text>
        </Text>
        <Text style={[styles.text, styles.created]}>
          {/* {moment(created).fromNow()} */}
          {created}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatarContainer: {
    alignItems: 'center',
    marginLeft: 5,
    paddingTop: 10,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    padding: 4,
    backgroundColor: 'white',
  },
  avatar: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  text: {
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: 24,
  },
  name: {
    fontWeight: 'bold',
  },
  created: {
    color: '#BBB',
  },
});
