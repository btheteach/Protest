import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Card } from '@paraboly/react-native-card'
import store from '../Redux/store'
import { addCluster, createSeed } from '../Redux/actions'
import { generateChannels, TIME_INTERVAL, MILLISECONDS, MINUTE_IN_MILLISECONDS } from '../shared/shared'

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

const getChannels = async (seedID, setFrequency) => await generateChannels(seedID)
  .then(channels => {
    setFrequency(channels.first)
  })
  .catch(error => {
    console.log('Failed to generate channel with error')
    console.log(error)
  })

function SeedCard ({ groupName, seedID, interval }) {
  const [frequency, setFrequency] = useState()
  let seedIDAsInt = Number.isInteger(seedID) ? parseInt(seedID) : seedID
  let intervalAsInt = parseInt(interval)

  useEffect(() => {
    const firstIteration = async () => {
      await getChannels(seedIDAsInt, setFrequency)
    }
    firstIteration()

    let timerID,
    moment = new Date() 
    timoutInMilliseconds = intervalAsInt === TIME_INTERVAL.THIRTY_SECONDS
      ? moment.getSeconds() * MILLISECONDS
      : (moment.getMinutes() * MINUTE_IN_MILLISECONDS) + (moment.getSeconds * MILLISECONDS)

    timoutInMilliseconds %= intervalAsInt
    setTimeout(() => {
      timerID = setInterval(() => {
        getChannels(seedIDAsInt, setFrequency)
      }, interval)
    }, timoutInMilliseconds)
    
    const unsubscribe = () => clearInterval(timerID)

    return unsubscribe
  }, [frequency])

  return (
    <Card
      title={groupName}
      iconDisable
      onPress={() => {}}
      bottomRightText={frequency}
      content={seedIDAsInt}
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
        interval: TIME_INTERVAL.THIRTY_SECONDS,
        seedID: 'litty'
      })

      await store.dispatch(addAction)
      
      await store.dispatch(createSeed({
        groupName: 'asdf',
        interval: TIME_INTERVAL.THIRTY_SECONDS
      }))
    }
    test()
    
    return unsubscribe
  }, [])

  return (
    <FlatList
      data={clusterData}
      renderItem={({ item }) => <SeedCard seedID={item.seedID.toString()} groupName={item.groupName} interval={item.interval.toString()}/>} 
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
