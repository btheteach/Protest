import React from 'react'
import SeedCardComponent from './Components/SeedCardComponent'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import Constants from 'expo-constants'
import Button from 'native-base'

export default function App () {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text>Hey</Text>
        <SeedCardComponent />
      </SafeAreaView>
      <Button>yull</Button>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  }
})

/// npm install redux react-redux --save
/// npm install @use-expo/font --save
/// npm install @freakycoder/react-native-helpers --save
/// npm install react-native-material-ripple --save
/// npm install react-native-dynamic-vector-icons --save
/// npm install react-native-vector-icons --save
/// npm install @paraboly/react-native-card --save

/// @shoutem/animation --save
/// npm i native-base --save
/// npm i react-native-modal --save

/// npx expo install react-native-gesture-handler
/// npx expo install expo-crypto
/// npx expo install expo-linear-gradient
/// npx expo install expo-constants
