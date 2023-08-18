import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

const SettingsScreen = () => {
  const [timerDuration, setTimerDuration] = useState('0');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const timerRef = firebase.database().ref('timer');

    timerRef.on('value', snapshot => {
      const data = snapshot.val();
      if (data) {
        setTimerDuration(data.duration.toString());
      }
    });

    return () => {
      timerRef.off('value');
    };
  }, []);

  const handleUpdateTimer = () => {
    if (!isUpdating) {
      setIsUpdating(true);
      const newDuration = parseInt(timerDuration, 10);

      if (!isNaN(newDuration)) {
        const timerRef = firebase.database().ref('timer');
        timerRef.update({ duration: newDuration }).then(() => {
          setIsUpdating(false);
        }).catch(error => {
          console.error('Error updating timer:', error);
          setIsUpdating(false);
        });
      } else {
        setIsUpdating(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text>Set your water reminder preferences here.</Text>
      <TextInput
        style={styles.input}
        placeholder="Timer duration (seconds)"
        keyboardType="numeric"
        value={timerDuration}
        onChangeText={text => setTimerDuration(text)}
      />
      <Button
        title={isUpdating ? 'Updating...' : 'Update Timer'}
        onPress={handleUpdateTimer}
        disabled={isUpdating}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default SettingsScreen;
