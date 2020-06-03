import React, { useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Card } from '@paraboly/react-native-card'
import store from '../Redux/store'
import { createSeed } from '../Redux/actions' 

const DATA = [
  {
    seedID: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    groupName: 'North',
    frequency: 420.55
  },
  {
    seedID: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    groupName: 'River',
    frequency: 458.85
  },
  {
    seedID: '58694a0f-3da1-471f-bd96-145571e29d72',
    groupName: 'Chicago',
    frequency: 328.15
  }
]

function SeedCard ({ groupName, seedID, frequency }) {
  return (
    <Card
      title={groupName}
      iconDisable
      onPress={() => {}}
      bottomRightText={frequency}
      content={seedID}
    />
  )
}

export default function SeedCardComponent () {
  useEffect(() => {
    let test = async () => {
      await store.dispatch(createSeed({
        name: 'cluster1',
        interval: 5
      }))
    }

    test()
  },[])

  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => <SeedCard seedID={item.seedID} groupName={item.groupName} frequency={item.frequency} />}
      keyExtractor={item => item.seedID}
    />
  )
}

const SeedCardComponentStyle = StyleSheet.create({
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
