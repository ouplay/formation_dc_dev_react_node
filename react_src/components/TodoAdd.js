import React, {useState} from 'react';

import {View, TextInput, Button, StyleSheet} from 'react-native';

const TodoAdd = (props) => {


  const [inputValue, setInputValue] = useState("");

  return <View style={styles.container}>
    <TextInput style={styles.text}  placeholder="Créer une nouvelle note :" value={inputValue} onChangeText={(value) => {
      console.log(value)
      setInputValue(value);
    }}/>
    <Button title="créer" onPress={() => {
      let newList = [...props.list];

      newList.push({
        title: inputValue,
        done: false,
      })
      props.setList(newList);
      setInputValue("");

    }}/>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    margin:5,
    padding:7,
    color:"#FFF",
    backgroundColor:"#34495e",
    borderRadius:5,
  }


})


export default TodoAdd;