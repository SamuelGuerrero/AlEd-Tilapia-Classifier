import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "./screens/HomeScreen";
import ManualScreen from "./screens/ManualScreen";
import Optionscreen from "./screens/OptionsScreen";
import PredictonPhotoScreen from "./screens/PredictonPhotoScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Options"
          component={Optionscreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Prediction By Photo"
          component={PredictonPhotoScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Manual"
          component={ManualScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
