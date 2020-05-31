import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'

import store from './src/store'
import { Provider } from 'react-redux'

import HomeScreen from './src/Screens/HomeScreen'

const Stack = createStackNavigator()

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={ HomeScreen }/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
