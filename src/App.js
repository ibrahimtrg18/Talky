import React from 'react';
import { NativeRouter, Route, Link } from 'react-router-native';
// screen
import Login from './screens/Login';

const App = () => {
  return (
    <NativeRouter>
      <Route exact path="/" component={Login} />
    </NativeRouter>
  );
};

export default App;
