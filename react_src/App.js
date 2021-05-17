import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files

import Header from './components/Header';
import Todo from './components/Todo';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {




  return (
    <View style={styles.container}>
      <Header/>
      <Todo/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:25,
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
  },
});
