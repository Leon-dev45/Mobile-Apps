import { FlatList, Pressable } from "react-native";
import React, { useMemo, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, Text } from "@/utils/theme";
import useGlobalStore from "@/store";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Category from "@/components/Category";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CreateTaskButton from "@/components/create-task-button";
import Tasks from "@/components/tasks";
import SafeAreaWrapper from "@/components/safe-area-wrapper";
import DeleteCategoryButton from "@/components/delete-category-button";

const Home = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { categories, selectedCategory } = useGlobalStore();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapShot = useMemo(() => ["60%"], []);

  return (
    <SafeAreaWrapper>
      <Box flex={1} bg="gray100">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mt="4"
          px="4"
        >
          <Box flexDirection="row" alignItems="center">
            <FontAwesome
              name="square-o"
              size={24}
              color={
                selectedCategory?.color.code === ""
                  ? "black"
                  : selectedCategory?.color.code
              }
            />
            <Text variant="text2Xl" ml="4">
              {selectedCategory?.name}
            </Text>
          </Box>
          <Pressable
            onPress={() => {
              bottomSheetRef.current?.present();
            }}
          >
            <Ionicons size={32} name="filter" />
          </Pressable>
        </Box>
        <Box height={20} />
        <Tasks />
        <BottomSheetModal ref={bottomSheetRef} snapPoints={snapShot} index={0}>
          <Box flex={1} mx="4">
            <FlatList
              data={categories}
              renderItem={({ item, index }) => (
                <Category
                  navigation={navigation}
                  index={index}
                  key={item.id}
                  category={item}
                  bottomSheetRef={bottomSheetRef}
                />
              )}
            />
            <Box position="absolute" right={4} bottom={insets.bottom}>
              <Pressable
                onPress={() => {
                  bottomSheetRef.current?.close();
                  navigation.navigate("CreateCategory");
                }}
              >
                <Box
                  bg="gray100"
                  width={64}
                  height={64}
                  borderRadius="roundedXl"
                  alignItems="center"
                  mb="4"
                  justifyContent="center"
                >
                  <MaterialCommunityIcons name="plus" size={40} color="black" />
                </Box>
              </Pressable>
            </Box>
          </Box>
        </BottomSheetModal>
        <CreateTaskButton />
        <DeleteCategoryButton category={selectedCategory} />
      </Box>
    </SafeAreaWrapper>
  );
};

export default Home;
