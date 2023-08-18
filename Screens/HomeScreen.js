import React from 'react';
import { View, Text, StyleSheet, Image, Button , ImageBackground } from 'react-native';
import WaterReminderTimer from './WaterRemainderTimer'

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source = {require('../assets/bg_img.png')} style = {styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>Stay Hydrated!</Text>
      <WaterReminderTimer />
      <Button
        title="Set Reminder"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage : {
    flex : 1,
    resizeMode : 'cover',
  justifyContent : 'center',
    width : -50,
    height : -20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;
