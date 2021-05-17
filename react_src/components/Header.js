import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text>Notes : </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ecf0f1',
  },
});

export default Header;
