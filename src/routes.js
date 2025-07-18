import React from "react";
import { useSelector } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Image, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import InitScreen from "./screens/InitScreen";
import ToggleTypeUser from "./screens/ToggleTypeUser";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import AntDesign from "react-native-vector-icons/AntDesign";
import ProfessionalSignUp from "./screens/ProfessionalSignUp";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Teste from "./screens/Teste";
import HomeProf from "./screens/HomeProf";
import Contatos from "./screens/CustomerContacts/";
import Conta from "./screens/CustomerProfile/";
import PerfilProf from "./screens/PerfilProf";
import Services from "./screens/Services";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerApp() {
  const typeUser = useSelector((state) => state.userReducer.typeUser);
  return (
    // documentação: https://reactnavigation.org/docs/drawer-navigator

    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#b18461",
        drawerInactiveTintColor: "#ccc",
        drawerStyle: {
          backgroundColor: "#1c2024",
          width: 250,
        },
      }}
      drawerContent={(props) => (
        <View style={{ flex: 1 }}>
          <View style={styles.logoContainer}>
            <Image source={require("../assets/icon.png")} style={styles.logo} />
          </View>
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        </View>
      )}
    >
      {typeUser === "profissional" ? (
        <>
          <Drawer.Screen
            name="Home"
            component={HomeProf}
            options={{
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="home"
                  size={size}
                  color={focused ? "#b18461" : "#ccc"}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Perfil"
            component={PerfilProf}
            options={{
              drawerIcon: ({ focused, size }) => (
                <MaterialIcons
                  name="person"
                  size={size}
                  color={focused ? "#b18461" : "#ccc"}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Serviços"
            component={Services}
            options={{
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  name="bag"
                  size={size}
                  color={focused ? "#b18461" : "#ccc"}
                />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="home"
                  size={size}
                  color={focused ? "#b18461" : "#ccc"}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Contatos"
            component={Contatos}
            options={{
              drawerIcon: ({ focused, size }) => (
                <AntDesign
                  name="contacts"
                  size={size}
                  color={focused ? "#b18461" : "#ccc"}
                />
              ),
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="InitScreen"
    >
      <Stack.Screen name="DrawerApp" component={DrawerApp} />
      <Stack.Screen name="InitScreen" component={InitScreen} />
      <Stack.Screen name="ToggleTypeUser" component={ToggleTypeUser} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ProfessionalSignUp" component={ProfessionalSignUp} />
      <Stack.Screen name="Perfil do Profissional" component={PerfilProf} />
      <Stack.Screen name="Conta" component={Conta} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
