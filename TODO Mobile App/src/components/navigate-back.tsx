import { View, Text, Pressable } from "react-native";
import React from "react";
import { Box } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NavigateBack = () => {
  const navigation = useNavigation();
  const navigateToHome = () => {
    navigation.navigate("Home");
  };
  return (
    <Box
      bg="white"
      borderRadius="rounded2Xl"
      width={40}
      height={40}
      alignItems="center"
      justifyContent="center"
    >
      <Pressable onPress={navigateToHome}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
    </Box>
  );
};

export default NavigateBack;
