import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// screen
import Home from './screens/Home';
import Login from './screens/Login';
import LoginAccount from './screens/LoginAccount';
import Conversation from './screens/Conversation';
import Profile from './screens/Profile';
import Setting from './screens/Setting';
import EditProfile from './screens/Setting/EditProfile';
import Register from './screens/Register';
// actions
import { userIsSignIn } from './redux/actions/auth';
import { fetchAccount } from './redux/actions/user';

const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      dispatch(userIsSignIn());
    })();
  }, [dispatch]);

  useEffect(() => {
    if (auth.access_token) {
      dispatch(fetchAccount());
    }
  }, [auth]);

  return (
    <NavigationContainer>
      {auth.access_token ? (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            component={Home}
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
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginAccount"
            component={LoginAccount}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
