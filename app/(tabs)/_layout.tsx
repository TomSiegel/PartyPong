import { actions } from "@/actions/actionRegistry";
import { Stack } from "expo-router";
import React from "react";

const App = () => {
  return (
    <Stack screenOptions={{ animation: "fade", animationDuration: 3500, animationTypeForReplace: "push", headerShown: false, contentStyle: {}}}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {actions.map(([href]) => (
        <Stack.Screen key={href.toString()} name={href.toString().replace("/(tabs)/", "")}  />
      ))}
    </Stack>
  );
};

export default App;
