import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button } from 'react-native'

export default function AddTaskScreen({ route, navigation }) {

  const {list} = route.params;

  const [title, setTitle] = useState('');

  const createTast = () => {
    list.push(title);
    navigation.navigate('Home', {list: list});
  }


  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} title='Back'></Button>
      <TextInput value={title} onChangeText={setTitle} />
      <Button onPress={() => createTast()} title='Save'></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
})
