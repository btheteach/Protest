import React, {useState, useEffect } from 'react'
import { FlatList, StyleSheet, Clipboard } from 'react-native'
import { Card } from '@paraboly/react-native-card'
import { Toast } from 'native-base'
import * as Animatable from 'react-native-animatable'
import { humanFont, sanFranciscoWeights } from 'react-native-typography'
import { addCluster, createSeed } from '../Redux/actions'
import { 
  generateChannels, 
  TIME_INTERVAL,
  getTimeout
} from '../shared/shared'

const copyToClipboard = (seedID) => {
  Toast.show({
    text: 'Seed ID Copied!',
    buttonText: 'Okay',
    style: SeedCardComponentStyle.toastButton,
    textStyle: SeedCardComponentStyle.toastButtonText
  })
  Clipboard.setString(seedID)
}

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

    let timeoutInMilliseconds = getTimeout(intervalAsInt)
    setTimeout(() => {
      getChannels(seedIDAsInt, setFrequency)
    }, timeoutInMilliseconds)
  }, [frequency])

  return (
    <Card
      title={groupName}
      titleStyle={SeedCardComponentStyle.title}
      iconDisable
      onPress={() => copyToClipboard(seedID) }
      topRightText={frequency + ('Hz')}
      topRightStyle={SeedCardComponentStyle.frequencyText}
      content={seedIDAsInt}
      contentStyle={SeedCardComponentStyle.seedText}
      style={SeedCardComponentStyle.Card}
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
    <Animatable.View animation='fadeInLeft'>
        <FlatList
          data={clusterData}
          renderItem={({ item }) => <SeedCard seedID={item.seedID.toString()} groupName={item.groupName} interval={item.interval.toString()}/>} 
          keyExtractor={(item, index) => index.toString()}
        />
      </Animatable.View>
    
  )
}

const SeedCardComponentStyle = StyleSheet.create({
  Card: {
    backgroundColor: '#414141',
    padding: 14,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 14,
    elevation: 2
  },
  title: {
    ...humanFont,
    ...sanFranciscoWeights.semibold,
    fontSize: 24,
    color: '#e16428',
    top: 10
  },
  seedText: {
    ...humanFont,
    ...sanFranciscoWeights.regular,
    fontSize: 13,
    color: '#f6e9e9',
    top: 10
  },
  frequencyText: {
    ...humanFont,
    ...sanFranciscoWeights.light,
    fontSize: 12,
    color: '#28e164',
    bottom: 4
  },
  toastButton: {

  },
  toastButtonText: {
    ...humanFont,
    ...sanFranciscoWeights.semibold
  }
})
