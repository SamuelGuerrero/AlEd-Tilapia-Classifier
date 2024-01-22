import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useMemo, useState } from "react";

import HomePage from "./screens/HomeScreen";
import ManualScreen from "./screens/ManualScreen";
import Optionscreen from "./screens/OptionsScreen";
import PredictionUploadPhotoScreen from "./screens/PredictionUploadPhotoScreen";
import PredictonPhotoScreen from "./screens/PredictonPhotoScreen";
import ModelContext from "./utils/ModelContext";
import { loadModel } from "./utils/loadModel";

const Stack = createNativeStackNavigator();

export default function App() {
  const [model, setModel] = useState<tf.LayersModel>();

  const memoizedLoadModel = useMemo(() => loadModel(), []);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const loadedModel = await memoizedLoadModel;
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading model: ", error);
      }
    };

    fetchModel();
  }, [memoizedLoadModel]);

  return (
    <ModelContext.Provider value={model}>
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
            name="PredictionByPhoto"
            component={PredictonPhotoScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PredictionUploadPhotoScreen"
            component={PredictionUploadPhotoScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Manual"
            component={ManualScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ModelContext.Provider>
  );
}
