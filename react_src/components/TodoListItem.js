import React from 'react';

import { Text, View, Button, StyleSheet } from 'react-native';

const TodoListItem = (props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, props.done === true && styles.textDone]}>
        {props.title}
      </Text>
      <Button
        style={styles.buttonDelete}
        title="X"
        onPress={() => {
          let newList = [...props.list];

          newList.splice(props.index, 1);

          props.setList(newList);
        }}
      />
      {props.done === false && (
        <Button
          style={styles.buttonDo}
          title="OK"
          onPress={() => {
            let newList = [...props.list];

            newList[props.index].done = true;

            props.setList(newList);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:2,
    
    flexDirection: 'row',
    justifyContent: 'flex-end',
    
  },
  text: {
    margin:10,    
    flex: 10,
    borderStyle: 'solid',
    borderRadius:40,
    borderWidth: 1,
    padding:5,
    color:"#aaa69d",   //"#bdc3c7",
    borderColor: '#2f3640',
  },
  textDone: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  button: {
    flex: 1,
  },
  buttonDelete:{
    borderRadius:50,
    backgroundColor:"#ff5252",
    

  },
  buttonDo: {
    
  }
});

export default TodoListItem;
