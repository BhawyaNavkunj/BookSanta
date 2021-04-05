import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import WelcomeScreen from './screens/WelcomeScreen';

export default class App extends React.Component{
  render(){
    return(
      <View>
      <WelcomeScreen/>
      </View>
    )
  }
}