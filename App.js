import { StyleSheet} from 'react-native';
import { Provider } from 'react-redux';
import Routes from './src/routes';
import { store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Routes/>
      </Provider>
    </NavigationContainer>
  );
}