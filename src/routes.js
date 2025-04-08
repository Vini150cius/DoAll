import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

const Routes = () => {
  return 
  (
  state.userToken == null ? (
    <>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </>
  ) : (
    <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </>
  )
  );
}

export default Routes;