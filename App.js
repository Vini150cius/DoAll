import { Provider } from "react-redux";
import Routes from "./src/routes";
import { store } from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Routes />
        <Toast />
      </Provider>
    </NavigationContainer>
  );
}
