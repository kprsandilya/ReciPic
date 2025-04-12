// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import LoginScreen from './LoginScreen';
// import RegisterScreen from './RegisterScreen';

// const Stack = createNativeStackNavigator();

// const AuthStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="Register" component={RegisterScreen} />
//       <Stack.Screen name="Login" component={LoginScreen} />
//     </Stack.Navigator>
//   );
// };

// export default AuthStack;
import { Stack } from "expo-router";

export default function AuthStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RegisterScreen" />
      <Stack.Screen name="LoginScreen" />
      
    </Stack>
  );
}
