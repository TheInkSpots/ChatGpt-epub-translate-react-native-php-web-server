import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';

// import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import {
  loadInitialData,
  addDeck,
  addCardsToDeck,
  removeDeck,
  resetData,
} from '../actions';

import Setting from './Setting';
import AddDeck from './AddDeck';
import DeckStackScreens from './DeckStackScreens';

class Main extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text text={'df'}>sdf</Text>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Deck') {
                  iconName = focused ? 'ios-apps' : 'ios-apps';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'ios-list-box' : 'ios-list';
                } else if (route.name === 'Add') {
                  iconName = focused
                    ? 'ios-add-circle'
                    : 'ios-add-circle-outline';
                }

                // You can return any component that you like here!
                return <Icon name="dehaze" size={40} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="Deck" component={DeckStackScreens} />
            <Tab.Screen name="Add" component={AddDeck} />
            <Tab.Screen name="Settings" component={Setting} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
});

function mapStateToProps(state) {
  return { deck: state };
}

const mapDispatchToProps = {
  loadInitialData,
  addDeck,
  addCardsToDeck,
  removeDeck,
  resetData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
