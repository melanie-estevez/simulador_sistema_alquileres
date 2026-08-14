import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RentalEventScreen from "./src/screens/RentalEventScreen";

import type { RootStackParamList } from "./src/types/navigation";
import FleetLogsScreen from "./src/screens/FleetLogScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Menú" }} />
        <Stack.Screen name="FleetLogsScreen" component={FleetLogsScreen} options={{ title: "Fleet Log" }} />
        <Stack.Screen name="RentalEventsScreen" component={RentalEventScreen} options={{ title: "Rental Event" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}