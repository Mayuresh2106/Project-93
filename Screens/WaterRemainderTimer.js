import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

const WaterReminderTimer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const seconds = time % 60;
  const minutes = Math.floor(time / 60);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 32,
  },
});

export default WaterReminderTimer;
