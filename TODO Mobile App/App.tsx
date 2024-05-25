import Navigation from "@/navigations";
import theme from "@/utils/theme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
