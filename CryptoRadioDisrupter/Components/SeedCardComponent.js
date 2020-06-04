import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Card } from '@paraboly/react-native-card'
import store from '../Redux/store'
import { addCluster, createSeed } from '../Redux/actions'
import { generateChannels, TIME_INTERVAL } from '../shared/shared'

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

const getFrequency = (seed, interval = undefined) => setInterval(generateChannels, interval, seed, interval);

function SeedCard ({ groupName, seedID, frequency = 101.3 }) {
  return (
    <Card
      title={groupName}
      iconDisable
      onPress={() => {}}
      bottomRightText={getFrequency(seedID)}
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

  const cleanUp = () => {
    clearInterval()
    unsubscribe()
  }

  useEffect(() => {
    const test = async () => {
      const addAction = addCluster({
        groupName: 'litGroup',
        interval: TIME_INTERVAL.THIRTY_SECONDS,
        seedID: 'litty'
      })

      await store.dispatch(addAction)
      
      await store.dispatch(createSeed({
        name: 'asdf',
        interval: TIME_INTERVAL.THIRTY_SECONDS
      }))
    }
    test()
    return cleanUp
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
