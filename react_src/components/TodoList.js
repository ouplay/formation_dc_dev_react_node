import React, {useState} from 'react';

import {View, Text, Button, StyleSheet} from 'react-native';

import TodoListItem from './TodoListItem';

const TodoList = (props) => {

  const [component, setComponent] = useState(null);

  return <View style={styles.container}>
    {props.list.map((item, index) => {
      return <TodoListItem title={item.title} index={index} setList={props.setList} list={props.list} done={item.done} />
    })
    }
    

  </View>
}

const styles = StyleSheet.create({
  container: {
    paddingTop:100,
    marginTop:10,
    marginBottom:30,
    marginRight:10,
    marginLeft:10,
    backgroundColor: "#34495e",
    flex: 1,
    borderRadius:30,
  },
  
})

export default TodoList;