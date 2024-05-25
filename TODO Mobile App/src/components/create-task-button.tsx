import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box } from "@/utils/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useGlobalStore from "@/store";

const CreateTaskButton = () => {
  const insets = useSafeAreaInsets();
  const isAndroid = Platform.OS === "android";
  const navigation = useNavigation();
  const { categories, tasks, updateTasks } = useGlobalStore();

  return (
    <Box
      position="absolute"
      bottom={insets.bottom + (isAndroid ? 70 : 40)}
      bg="gray200"
      right={20}
      width={64}
      height={20}
      borderRadius="roundedXl"
    >
      <Pressable
        disabled={categories.length > 0 ? false : true}
        onPress={() => {
          navigation.navigate("CreateTask");
        }}
      >
        <Box
          bg="gray200"
          width={64}
          height={64}
          alignItems="center"
          justifyContent="center"
          borderRadius="roundedXl"
        >
          <MaterialCommunityIcons name="plus" size={40} color={"black"} />
        </Box>
      </Pressable>
    </Box>
  );
};

export default CreateTaskButton;

const styles = StyleSheet.create({});
