import React from "react";
import { useSelector } from "react-redux";
import InitScreen from "./screens/InitScreen";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function Routes() {
  const loginStatus = useSelector((state) => state.userReducer.login);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="InitScreen"
    >
      <>
        {loginStatus == null ? (
          <>
            <Stack.Screen name="InitScreen" component={InitScreen} />
            {/* <Stack.Screen name="ToggleTypeUser" component={ToggleTypeUser} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} /> */}
          </>
        ) : (
          <>{/* <Stack.Screen name="Home" component={HomeScreen} /> */}</>
        )}
      </>
    </Stack.Navigator>
  );
}
