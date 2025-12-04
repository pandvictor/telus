import React from "react";
import { StyleSheet, View, FlatList, ActivityIndicator, Alert } from "react-native";
import { Text } from "../components/atoms/Text";
import { Button } from "../components/atoms/Button";
import { useDeleteTodoMutation, useGetTodosQuery } from "../services/todoApi";

export default function HomeScreen({ navigation }) {
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
  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Button label='Delete' onPress={() => deleteTask(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To Do&apos;s</Text>

      <Button
        onPress={() => navigation.navigate("AddTask", { list: toDoList })}
        label='Add'
      />
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size='small' />
        </View>
      )}
      {isError && (
        <Text style={styles.errorText}>
          Ocurrió un error al cargar las tareas. Intenta nuevamente.
        </Text>
      )}
      <FlatList
        data={toDoList}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks</Text>}
        contentContainerStyle={toDoList.length ? null : styles.emptyList}
        onRefresh={refetch}
        refreshing={isFetching}
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
  loading: {
    marginVertical: 12,
  },
  errorText: {
    color: "red",
    marginBottom: 12,
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
