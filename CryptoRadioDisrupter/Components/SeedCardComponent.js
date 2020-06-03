import React from 'react'
import { FlatList, StyleSheet, Clipboard } from 'react-native'
import { Card } from '@paraboly/react-native-card'
import { Toast } from 'native-base'
import * as Animatable from 'react-native-animatable'
import { humanFont, sanFranciscoWeights, material } from 'react-native-typography'

const DATA = [
  {
    id: '0',
    seedID: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    groupName: 'Group A',
    frequency: 420.55
  },
  {
    id: '1',
    seedID: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    groupName: 'Group B',
    frequency: 458.85
  },
  {
    id: '2',
    seedID: '58694a0f-3da1-471f-bd96-145571e29d72',
    groupName: 'Group C',
    frequency: 328.15
  }
]

function SeedCard ({ groupName, seedID, frequency }) {
  return (
    <Card
      title={groupName}
      titleStyle={SeedCardComponentStyle.title}
      iconDisable
      onPress={() => { CopyToClipboard(seedID) }}
      topRightText={frequency + ('Hz')}
      topRightStyle={SeedCardComponentStyle.frequencyText}
      content={seedID}
      contentStyle={SeedCardComponentStyle.seedText}
      style={SeedCardComponentStyle.Card}
    />
  )
}

function CopyToClipboard (seedID) {
  Toast.show({
    text: 'Seed ID Copied!',
    buttonText: 'Okay',
    style: SeedCardComponentStyle.toastButton,
    textStyle: SeedCardComponentStyle.toastButtonText
  })
  Clipboard.setString(seedID)
}

export default function SeedCardComponent () {
  return (
    <Animatable.View animation='fadeInLeft'>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <SeedCard seedID={(item.seedID)} groupName={item.groupName} frequency={item.frequency} />}
        keyExtractor={item => item.id}
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
