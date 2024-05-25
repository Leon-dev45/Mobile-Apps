import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Box, Text } from "@/utils/theme";
import { Picker } from "@react-native-picker/picker";
import useGlobalStore from "@/store";
import { nanoid } from "nanoid/non-secure";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/navigations/types";
import SafeAreaWrapper from "@/components/safe-area-wrapper";
import NavigateBack from "@/components/navigate-back";

type EditTaskRoute = RouteProp<RootStackParamList, "EditTask">;

const EditTask = () => {
  const { categories, updateTasks, tasks, updateSelectedCategory } =
    useGlobalStore();
  const navigation = useNavigation();
  const { params } = useRoute<EditTaskRoute>();
  const [newTask, setNewTask] = useState<ITask>(params.task);
  const handleEditTask = () => {
    if (newTask.name.length > 0) {
      const updatedTasks = tasks.map((taskItem) => {
        if (taskItem.id === newTask.id) {
          return {
            ...newTask,
          };
        } else {
          return taskItem;
        }
      });
      updateTasks(updatedTasks);
      const currentCategory = categories.find(
        (categoryItem) => categoryItem.id === newTask.category_id
      );
      if (currentCategory) {
        updateSelectedCategory(currentCategory);
        navigation.navigate("Home");
      }
    }
  };
  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((taskItem) => taskItem.id !== newTask.id);
    updateTasks(updatedTasks);
    navigation.navigate("Home");
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} bg="gray100" p="4" pb="10">
        <NavigateBack />
        <Box height={16} />
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            width={"100%"}
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              width={"100%"}
              bg="white"
              borderRadius="roundedXl"
              alignItems="center"
              justifyContent="center"
              p="4"
            >
              <TextInput
                style={{
                  fontSize: 20,
                  width: "100%",
                }}
                placeholder="Create new task"
                value={newTask.name}
                onChangeText={(text) => {
                  setNewTask((prev) => ({ ...prev, name: text }));
                }}
              />
            </Box>
            <Box height={20} />
            <Box width={"100%"}>
              <Picker
                style={{ backgroundColor: "white", borderRadius: 16 }}
                selectedValue={newTask.category_id}
                onValueChange={(item) => {
                  const currentCategory = categories.find(
                    (categoryItem) => categoryItem.id === item
                  );
                  if (currentCategory) {
                    setNewTask((prev) => ({
                      ...prev,
                      category_id: currentCategory.id,
                    }));
                  }
                }}
              >
                {categories.map((category) => (
                  <Picker.Item
                    key={category.id}
                    label={category.name}
                    value={category.id}
                    style={{ backgroundColor: "white", borderRadius: 16 }}
                  />
                ))}
              </Picker>
            </Box>
          </Box>
          <Box
            mx="4"
            bg="red500"
            width={"100%"}
            borderRadius="roundedXl"
            p="4"
            alignItems="center"
            style={{ marginTop: 400 }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleDeleteTask}
            >
              <Text variant="textXl" color="blu200">
                Delete
              </Text>
            </TouchableOpacity>
          </Box>
          <Box
            mx="4"
            bg="blu500"
            width={"100%"}
            borderRadius="roundedXl"
            p="4"
            alignItems="center"
            style={{ marginTop: 20 }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleEditTask}
            >
              <Text variant="textXl" color="blu200">
                Edit
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default EditTask;

const styles = StyleSheet.create({});
