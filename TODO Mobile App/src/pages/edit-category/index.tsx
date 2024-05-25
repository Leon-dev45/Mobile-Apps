import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { nanoid } from "nanoid/non-secure";
import theme, { Box, Text } from "@/utils/theme";
import { getColors } from "@/utils/helpers";
import { Picker } from "@react-native-picker/picker";
import useGlobalStore from "@/store";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import SafeAreaWrapper from "@/components/safe-area-wrapper";
import NavigateBack from "@/components/navigate-back";
import { RootStackParamList } from "@/navigations/types";

const COLORS = getColors();

type EditCategoryRoute = RouteProp<RootStackParamList, "EditCategory">;

const EditCategory = () => {
  const { params } = useRoute<EditCategoryRoute>();
  const [newCategory, setNewCategory] = useState<ICategory>(params.category);
  const navigation = useNavigation();

  const {
    updateSelectedCategory,
    updateCategory,
    categories,
    tasks,
    updateTasks,
  } = useGlobalStore();

  const handleEditCategory = () => {
    if (newCategory.name.length > 0) {
      const updatedCategory = categories.map((categoryItem) => {
        if (categoryItem.id === newCategory.id) {
          return {
            ...newCategory,
          };
        } else {
          return categoryItem;
        }
      });
      updateCategory(updatedCategory);
      updateSelectedCategory(newCategory);
      navigation.navigate("Home");
    }
  };

  const handleDeleteCategory = () => {
    const updatedCategories = categories.filter(
      (categoryItem) => categoryItem.id !== newCategory.id
    );
    const updatedTasks = tasks.filter(
      (taskItem) => taskItem.category_id !== newCategory.id
    );
    updateCategory(updatedCategories);
    updateTasks(updatedTasks);
    if (updatedCategories.length === 0) {
      updateSelectedCategory({
        name: "",
        id: `category_${nanoid()}`,
        color: {
          code: "",
          id: "",
          name: "",
        },
      });
      navigation.navigate("CreateCategory");
    } else {
      updateSelectedCategory(updatedCategories[0]);

      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} bg="gray200" pb="10" p="4">
        <NavigateBack />
        <Box height={16} />
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          mx="4"
        >
          <Box
            width={"100%"}
            flexDirection="column"
            alignItems="center"
            mt="5"
            justifyContent="center"
          >
            <Box
              width={"100%"}
              bg="white"
              borderRadius="rounded2Xl"
              alignItems="center"
              justifyContent="center"
              p="4"
            >
              <TextInput
                style={{ fontSize: 20, width: "100%" }}
                value={newCategory.name}
                onChangeText={(text) => {
                  setNewCategory((prev) => ({
                    ...prev,
                    name: text,
                  }));
                }}
                placeholder="Create new category"
              />
            </Box>
            <Box height={20} />
            <Box width={"100%"}>
              <Picker
                selectedValue={newCategory.color.id}
                onValueChange={(item, index) => {
                  const currentColor = COLORS.find(
                    (color) => color.id === item
                  );
                  if (currentColor) {
                    setNewCategory((prev) => ({
                      ...prev,
                      color: currentColor,
                    }));
                  }
                }}
                style={{
                  backgroundColor: theme.colors.white,
                  borderRadius: 16,
                }}
              >
                {COLORS.map((color) => (
                  <Picker.Item
                    key={color.id}
                    label={color.name}
                    value={color.id}
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
              onPress={handleDeleteCategory}
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
              onPress={handleEditCategory}
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

export default EditCategory;
