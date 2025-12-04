import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { Button } from "../components/atoms/Button";
import { useAddTodoMutation } from "../services/todoApi";

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [addTodo, { isLoading }] = useAddTodoMutation();

  const createTask = async () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      Alert.alert("Campo requerido", "Escribe un título para la tarea.");
      return;
    }

    try {
      await addTodo({ title: trimmedTitle, completed: false }).unwrap();
      setTitle("");
      navigation.goBack();
    } catch (_error) {
      Alert.alert("Error", "No se pudo guardar la tarea. Intenta nuevamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} label='Back' />
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder='Título de la tarea'
        style={styles.input}
      />
      <Button onPress={createTask} label='Save' disabled={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
  },
});
