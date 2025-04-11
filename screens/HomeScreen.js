import React, {useState} from 'react'
import { StyleSheet, View, Text, FlatList, Button } from 'react-native'

export default function HomeScreen({ route, navigation }) {

  const [toDoList, setTodoList] = useState([{title: 'Task1'}]);

  const deleteTask = () => {

  }



  return (
    <View style={styles.container}>
      <Text>
        To Do's
      </Text>

<Button onPress={() => navigation.navigate('AddTask', {list: toDoList})} title='Add'></Button>
      <FlatList
      renderItem={(todo, index) => {
        <View>
          <Text>Task title: {todo.title}</Text>
          <Button title='Delete' onPress={() => deleteTask}></Button>
        </View>
      }}
        data={toDoList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
})
