import React from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native'
import Constants from 'expo-constants'
import { Card } from '@paraboly/react-native-card'

const DATA = [
  {
    seedID: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    groupName: 'North',
    frequency: 428.55
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item'
  }
]

function Item ({ title }) {
  return (
    <Card
      title={title}
      iconName='home'
      defaultTitle=''
      iconType='Entypo'
      defaultContent=''
      onPress={() => {}}
      topRightText='50/301'
      bottomRightText='30 km'
      content='Lorem ipsum dolor sit.'
    />
  )
}

export default function SeedCardComponent () {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
})
