import React from 'react';

import { Text, View, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notes : </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius:30,
    padding: 16,
    
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#40407a',
    marginBottom:15,
  },
  text: {
    color:"#aaa69d",
  }
});

export default Header;
