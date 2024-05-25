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
import { useNavigation } from "@react-navigation/native";
import SafeAreaWrapper from "@/components/safe-area-wrapper";
import NavigateBack from "@/components/navigate-back";

const COLORS = getColors();

const CreateCategory = () => {
  const navigation = useNavigation();
  const [newCategory, setNewCategory] = useState<ICategory>({
    id: `category-${nanoid()}`,
    color: {
      code: "",
      id: `color-${nanoid()}`,
      name: "",
    },
    name: "",
  });

  const { addCategory, updateSelectedCategory } = useGlobalStore();

  const handleOnCreateCategory = () => {
    if (newCategory.name.length > 0) {
      addCategory(newCategory);

      setNewCategory({
        name: "",
        id: `category_${nanoid()}`,
        color: {
          code: "",
          id: "",
          name: "",
        },
      });
      updateSelectedCategory(newCategory);

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
            bg="blu500"
            width={"100%"}
            py="4"
            borderRadius="rounded2Xl"
            alignItems="center"
            style={{
              marginTop: 450,
            }}
          >
            <TouchableOpacity
              style={{ width: "100%", alignItems: "center" }}
              onPress={handleOnCreateCategory}
            >
              <Text color="blu200" variant="textXl">
                Create
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateCategory;

const styles = StyleSheet.create({});
