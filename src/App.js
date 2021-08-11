import React from 'react';
import { NativeRouter, Route, Link } from 'react-router-native';
// screen
import Login from './screens/Login';
import Home from './screens/Home';

const App = () => {
  return (
    <NativeRouter>
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Home} />
    </NativeRouter>
  );
};

export default App;
