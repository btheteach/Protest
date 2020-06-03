import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import Constants from 'expo-constants'
import { BlurView } from 'expo-blur'
import { Button, Icon } from 'native-base'

import AntDesign from 'react-native-vector-icons/AntDesign'
import { Sae } from 'react-native-textinput-effects'
import * as Animatable from 'react-native-animatable'

export default function AddSeedComponent () {
  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const NameField = (
    <Sae
      label='Enter Name'
      labelStyle={{ color: '#fff' }}
      iconClass={AntDesign}
      iconName='folderopen'
      iconColor='white'
      inputPadding={16}
      labelHeight={24}
      borderHeight={2}
      autoCapitalize='none'
      autoCorrect={false}
      style={AddSeedCardComponentStyle.InputFields}
    />
  )

  const IntervalField = (
    <Sae
      label='Enter Interval'
      labelStyle={{ color: '#fff' }}
      iconClass={AntDesign}
      iconName='clockcircle'
      iconColor='white'
      placeholderTextColor='white'
      inputPadding={16}
      labelHeight={24}
      borderHeight={2}
      autoCapitalize='none'
      autoCorrect={false}
      style={AddSeedCardComponentStyle.InputFields}
    />
  )

  return (
    <>
      <Animatable.View animation='fadeIn'>

        <Animatable.View animation='fadeInLeft'>
          <Button iconLeft bordered style={AddSeedCardComponentStyle.AddSeedIconButton} onPress={toggleModal}>
            <Icon name='add-circle' style={AddSeedCardComponentStyle.AddSeedIcon} />
          </Button>
        </Animatable.View>

        <Modal
          isVisible={isModalVisible}
          style={AddSeedCardComponentStyle.Modal}
          backdropColor='#000'
          backdropOpacity={0.8}
          animationIn='zoomInDown'
          animationOut='zoomOutUp'
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          <BlurView intensity={100} style={[StyleSheet.absoluteFill, AddSeedCardComponentStyle.ModalContainer]}>
            <Animatable.Text animation='fadeInDown' style={AddSeedCardComponentStyle.ModalTitle}>Seed Generator</Animatable.Text>
            <Animatable.View animation='fadeIn'>
              <Animatable.View animation='fadeInUp'>
                {NameField}
                {IntervalField}
              </Animatable.View>
              <Animatable.View animation='fadeInUp'>
                <Button rounded onPress={toggleModal} style={AddSeedCardComponentStyle.CreateSeedComponentButton}>
                  <Animatable.Text animation='fadeIn' style={AddSeedCardComponentStyle.ModalButtonText}>Create Seed</Animatable.Text>
                </Button>
                <Button rounded onPress={toggleModal} style={AddSeedCardComponentStyle.CloseModalButton}>
                  <Animatable.Text animation='fadeIn' style={AddSeedCardComponentStyle.ModalButtonText}>Close</Animatable.Text>
                </Button>
              </Animatable.View>
            </Animatable.View>
          </BlurView>
        </Modal>
      </Animatable.View>
    </>
  )
}

const AddSeedCardComponentStyle = StyleSheet.create({
  Modal: {
    elevation: 3
  },
  ModalContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignContent: 'center',
    alignSelf: 'auto',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10
  },
  ModalTitle: {
    fontSize: 20,
    alignSelf: 'center'
  },
  AddSeedIconButton: {
    alignContent: 'center',
    alignSelf: 'auto',
    justifyContent: 'center',
    marginHorizontal: 30,
    borderRadius: 10
  },
  AddSeedIcon: {
    color: 'red',
    width: 25,
    height: 25
  },
  CreateSeedComponentButton: {
    margin: 10,
    padding: 10,
    top: 15,
    borderRadius: 10
  },
  CloseModalButton: {
    margin: 10,
    padding: 10,
    top: 15,
    borderRadius: 10
  },
  ModalButtonText:
  {
    fontSize: 12,
    alignContent: 'center',
    alignSelf: 'auto',
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1
  },
  InputFields: {
    marginHorizontal: 20,
    padding: 10
  }
})
