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
import { useNavigation } from "@react-navigation/native";
import SafeAreaWrapper from "@/components/safe-area-wrapper";
import NavigateBack from "@/components/navigate-back";

const CreateTask = () => {
  const { categories, selectedCategory, addTask, updateSelectedCategory } =
    useGlobalStore();
  const navigation = useNavigation();
  const [newTask, setNewTask] = useState<ITask>({
    id: `task_${nanoid()}`,
    name: "",
    category_id: selectedCategory?.id ?? "",
    completed: false,
  });
  const handleCreateTask = () => {
    if (newTask.name.length > 0) {
      addTask(newTask);
      const currentCategory = categories.find(
        (categoryItem) => categoryItem.id === newTask.category_id
      );
      if (currentCategory) {
        updateSelectedCategory(currentCategory);
        navigation.navigate("Home");
      }
    }
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
          <TouchableOpacity
            onPress={handleCreateTask}
            style={{ width: "100%", marginTop: 500 }}
          >
            <Box
              bg="blu500"
              width={"100%"}
              borderRadius="roundedXl"
              p="4"
              alignItems="center"
            >
              <Text variant="textXl" color="blu200">
                Create
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateTask;

const styles = StyleSheet.create({});
