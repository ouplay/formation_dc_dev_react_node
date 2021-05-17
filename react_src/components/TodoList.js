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
    <Button title="Creer composant" onPress={() => {
      setComponent(<Text>mon composant créé de toute pièce</Text>)
    }}/>
    {component}

  </View>
}

const styles = StyleSheet.create({
  container: {
    paddingTop:30,
    marginTop:10,
    marginBottom:30,
    backgroundColor: "#34495e",
    flex: 1,
    borderRadius:5,
  }
})

export default TodoList;