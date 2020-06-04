import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Card } from '@paraboly/react-native-card'
import store from '../Redux/store'
import { addCluster } from '../Redux/actions'

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

function SeedCard ({ groupName, seedID, frequency = 101.3 }) {
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
  const [clusterData, setClusterData] = useState(store.getState().clusters)
  const unsubscribe = store.subscribe(() => {
    let c = store.getState().clusters
    setClusterData(c)
  })
  useEffect(() => {
    const test = async () => {
      const addAction = addCluster({
        groupName: 'litGroup',
        interval: 10,
        seedID: 'litty'
      })

      store.dispatch(addAction)
    }
    test()
    return unsubscribe
  }, [])

  return (
    <FlatList
      data={clusterData}
      renderItem={({ item }) => <SeedCard seedID={item.seedID} groupName={item.groupName}/>} 
      keyExtractor={(item, index) => index.toString()}
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
