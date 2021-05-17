import React, {useState} from 'react';

import {Text, View, StyleSheet} from 'react-native';

import TodoAdd from './TodoAdd';
import TodoList from './TodoList';

const Todo = () => {


  const [list, setList] = useState([
    {
      title: "Faire les courses",
      done: true,
    },
    {
      title: "Faire le ménage",
      done: true,
    },
    {
      title: "Faire les papiers",
      done: false,
    },
    {
      title: "Promener le chien",
      done: true,
    }
  ])

    
  return <View style={styles.container}>
    <TodoAdd list={list} setList={setList}/>
    <TodoList list={list} setList={setList}/>
  </View>

}


const styles = StyleSheet.create({
  container: {
    paddingTop:15,
    paddingLeft:5,
    paddingRight:5,
    borderStyle: "solid",
    borderColor: "#555",
    borderWidth: 2,
    borderRadius:5,
    flex: 1,
    backgroundColor:"#444"
  }
})



export default Todo;