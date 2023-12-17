import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Calculator from "./src/screens/Calculator";
import { NavProvider } from "./src/hooks/NavHook";
import Length from "./src/screens/Length";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <NavProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Calculator"
          >
            <Stack.Screen name="Calculator" component={Calculator} />
            <Stack.Screen name="Length" component={Length} />
          </Stack.Navigator>
        </NavigationContainer>
      </NavProvider>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
