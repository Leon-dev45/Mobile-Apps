import useGlobalStore from "@/store";
import { Box, Text } from "@/utils/theme";
import { FontAwesome } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { RefObject } from "react";
import { Pressable, StyleSheet } from "react-native";

type CategoryProps = {
  category: ICategory;
  index: number;
  bottomSheetRef: RefObject<BottomSheetModal>;
  navigation: any;
};

const Category = ({ bottomSheetRef, category, index }: CategoryProps) => {
  const { updateSelectedCategory, selectedCategory, categories } =
    useGlobalStore();

  const onUpdateSelectedCategory = (category: ICategory) => {
    updateSelectedCategory(category);
    bottomSheetRef.current?.close();
  };

  return (
    <Pressable onPress={() => onUpdateSelectedCategory(category)}>
      <Box
        p="4"
        bg={selectedCategory?.id === category.id ? "blu200" : "gray100"}
        key={category.id}
        flexDirection="row"
        alignItems="center"
        borderTopLeftRadius={index === 0 ? "roundedXl" : "none"}
        borderTopRightRadius={index === 0 ? "roundedXl" : "none"}
        borderBottomLeftRadius={categories.length - 1 ? "roundedXl" : "none"}
        borderBottomRightRadius={categories.length - 1 ? "roundedXl" : "none"}
      >
        <FontAwesome
          name="square-o"
          size={24}
          color={category.color.code ? category.color.code : "black"}
        />
        <Text variant="textXl" ml="4">
          {category.name}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Category;
