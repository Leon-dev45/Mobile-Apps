import { FlatList, StyleSheet } from "react-native";
import React from "react";
import useGlobalStore from "@/store";
import { Box, Text } from "@/utils/theme";
import Task from "./task";

const Tasks = () => {
  const { tasks, selectedCategory } = useGlobalStore();

  if (!selectedCategory) {
    return null;
  }
  const tasksInCurrentCategory = tasks.filter(
    (task) => task.category_id === selectedCategory.id
  );
  return (
    <Box flex={1}>
      <FlatList
        data={tasksInCurrentCategory}
        renderItem={({ item }) => <Task task={item} />}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

export default Tasks;

const styles = StyleSheet.create({});
