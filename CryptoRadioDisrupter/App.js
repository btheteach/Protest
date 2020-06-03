import React from 'react'
import SeedCardComponent from './Components/SeedCardComponent'
import AddSeedComponent from './Components/AddSeedComponent'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Root } from 'native-base'
import Constants from 'expo-constants'
import * as Animatable from 'react-native-animatable'

// Javascript style
export default function App () {
  return (
    <>
      {/* HTML STYLE */}
      <Root>
        <SafeAreaView style={DefaultStyles.container}>
          <Animatable.Text animation='fadeIn' style={DefaultStyles.titleText}>Crypto Radio Disrupter</Animatable.Text>
          <SeedCardComponent />
          <AddSeedComponent />
        </SafeAreaView>
      </Root>
    </>
  )
}

const DefaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  titleText: {
    fontSize: 22,
    padding: 15
  }
})

/// npm install redux react-redux --save
/// npm install @freakycoder/react-native-helpers --save
/// npm install react-native-material-ripple --save
/// npm install react-native-dynamic-vector-icons --save
/// npm install react-native-vector-icons --save
/// npm install @paraboly/react-native-card --save

/// npm install react-native-typography --save
/// npm i react-native-textinput-effects --save
/// npm i native-base --save
/// npm i react-native-modal --save

/// npm install react-native-animatable --save

/// npx expo install react-native-gesture-handler
/// npx expo install expo-crypto
/// npx expo install expo-linear-gradient
/// npx expo install expo-constants
/// npx expo install expo-blur

/// npm r @shoutem/animation --save
/// npm r @use-expo/font --save
