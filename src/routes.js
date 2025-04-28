import React from "react";
import { useSelector } from "react-redux";
import InitScreen from "./screens/InitScreen";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { createDrawerNavigator } from "@react-navigation/drawer";
import ToggleTypeUser from "./screens/ToggleTypeUser";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";

const Drawer = createDrawerNavigator();

export default function Routes() {
  const loginStatus = useSelector((state) => state.userReducer.login);

  return (
    <>
      {loginStatus == null ? (
        <>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="InitScreen"
          >
            <Stack.Screen name="InitScreen" component={InitScreen} />
            <Stack.Screen name="ToggleTypeUser" component={ToggleTypeUser} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} /> 
          </Stack.Navigator>
        </>
      ) : loginStatus == "client" ? (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator>
          {/* <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
          <Drawer.Screen name="Profile" component={InitScreen} />
        </Drawer.Navigator>
      )}
    </>
  );
}
