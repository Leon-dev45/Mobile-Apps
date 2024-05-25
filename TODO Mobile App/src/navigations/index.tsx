import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "./types";
import Home from "@/pages/home";
import CreateTask from "@/pages/create-task";
import CreateCategory from "@/pages/create-category";
import EditTask from "@/pages/edit-task";
import EditCategory from "@/pages/edit-category";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CreateTask" component={CreateTask} />
      <Stack.Screen name="CreateCategory" component={CreateCategory} />
      <Stack.Screen name="EditTask" component={EditTask} />
      <Stack.Screen name="EditCategory" component={EditCategory} />
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
