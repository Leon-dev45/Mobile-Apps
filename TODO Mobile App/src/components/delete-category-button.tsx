import { Platform, Pressable, StyleSheet } from "react-native";
import React, { RefObject } from "react";
import { Box } from "@/utils/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useGlobalStore from "@/store";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

type DeleteProp = {
  category: ICategory | null;
};

const DeleteCategoryButton = ({ category }: DeleteProp) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const isAndroid = Platform.OS === "android";
  const { categories } = useGlobalStore();

  return (
    <Box
      position="absolute"
      bottom={insets.bottom + (isAndroid ? 70 : 40)}
      bg="blu500"
      right={300}
      width={64}
      height={20}
      borderRadius="roundedXl"
    >
      <Pressable
        onPress={() => {
          if (categories.length > 0 && category) {
            navigation.navigate("EditCategory", { category });
          }
        }}
      >
        <Box
          bg="blu500"
          width={64}
          height={64}
          alignItems="center"
          justifyContent="center"
          borderRadius="roundedXl"
        >
          <FontAwesome6 name="edit" size={32} color={"black"} />
        </Box>
      </Pressable>
    </Box>
  );
};

export default DeleteCategoryButton;

const styles = StyleSheet.create({});
