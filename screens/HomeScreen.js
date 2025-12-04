import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text } from "../components/atoms/Text";
import { Button } from "../components/atoms/Button";
import { useDeleteTodoMutation } from "../services/todoApi";

export default function HomeScreen({ route, navigation }) {
  const {
    data: toDoList = [],
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();

  const deleteTask = async (id) => {
    try {
      await deleteTodo(id).unwrap();
    } catch (_error) {
      Alert.alert("Error", "No se pudo eliminar la tarea. Intenta nuevamente.");
    }
  };
  const renderItem = (item) => {
    <View>
      <Text>{item.title}</Text>
      <Button title='delete' onPress={() => deleteTask(item.id)}></Button>
    </View>;
  };
  console.log("toDoList", toDoList);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To Do&apos;s</Text>

      <Button
        onPress={() => navigation.navigate("AddTask", { list: toDoList })}
        title='Add'></Button>
      <FlatList
        data={toDoList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No tasks</Text>}
        contentContainerStyle={toDoList.length ? null : styles.emptyText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskTitle: {
    fontSize: 16,
    flex: 1,
    marginRight: 12,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
  },
});
