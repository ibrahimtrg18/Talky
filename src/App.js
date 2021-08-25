import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screen
import Home from './screens/Home';
import Login from './screens/Login';
import Conversation from './screens/Conversation';
import Profile from './screens/Profile';
// actions
import { userIsSignIn } from './redux/actions/auth';

const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(userIsSignIn());
    })();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Conversation"
          component={Conversation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
