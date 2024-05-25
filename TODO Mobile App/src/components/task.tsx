import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Box, Text, Theme } from "@/utils/theme";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import useGlobalStore from "@/store";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

type TaskProps = {
  task: ITask;
};

const Task = ({ task }: TaskProps) => {
  const theme = useTheme<Theme>();
  const { toggleTaskStatus } = useGlobalStore();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        flex: 1,
        marginVertical: 2,
        marginLeft: 8,
        width: "95%",
      }}
      onPress={() => {
        toggleTaskStatus(task);
      }}
      onLongPress={() => {
        navigation.navigate("EditTask", { task });
      }}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        p="4"
      >
        <Box>
          <Box
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
          >
            <FontAwesome
              name="square"
              size={24}
              color={
                task.completed ? theme.colors.green500 : theme.colors.gray200
              }
            />
            <Text variant="textXl" ml="4">
              {task.name}
            </Text>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default Task;

const styles = StyleSheet.create({});
