import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import Constants from 'expo-constants'
import { BlurView } from 'expo-blur'
import { Button, Icon } from 'native-base'

import AntDesign from 'react-native-vector-icons/AntDesign'
import { Sae } from 'react-native-textinput-effects'
import * as Animatable from 'react-native-animatable'
import { humanFont, sanFranciscoWeights } from 'react-native-typography'
import { connect } from "react-redux";
import { createSeed } from "../Redux/actions";
import SetIntervalPickerModal from './SetTimeIntervalPickerModal'

class AddSeedComponent extends React.Component {
  state = {
    isModalVisible: false,
    name: '',
    interval: ''
  }

  handleNameChange = name => {
    this.setState({ name })
  }

  handleIntervalChange = interval => {
    this.setState({ interval })
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  createNewCard = () => {
    const card = { groupName: this.state.name, interval: this.state.interval}
    this.props.createCard(card);
    this.toggleModal();
  }

  NameField = () => {
    return (
      <Sae
        label='Enter Name'
        labelStyle={{ color: '#f6e9e9' }}
        iconClass={AntDesign}
        iconName='folderopen'
        iconColor='#e16428'
        placeholderTextColor='#f6e9e9'
        inputPadding={16}
        labelHeight={24}
        borderHeight={2}
        onChangeText={this.handleNameChange}
        autoCapitalize='none'
        autoCorrect={false}
        style={AddSeedCardComponentStyle.InputFields}
      />
    )
  }

  render() {
    return (
      <Animatable.View animation='fadeIn' >

        <Animatable.View animation='fadeInLeft'>
          <Button iconLeft bordered style={AddSeedCardComponentStyle.AddSeedIconButton} onPress={this.toggleModal}>
            <Icon name='add-circle' style={AddSeedCardComponentStyle.AddSeedIcon} />
          </Button>
        </Animatable.View>

        <Modal
          isVisible={this.state.isModalVisible}
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
            <Animatable.Text animation='fadeInDown' style={AddSeedCardComponentStyle.ModalTitle}>Cluster Manager</Animatable.Text>
            <Animatable.View animation='fadeIn'>
              <Animatable.View animation='fadeInUp'>
                {this.NameField()}
                <SetIntervalPickerModal />
              </Animatable.View>
              <Animatable.View animation='fadeInUp'>
                <Button bordered onPress={this.createNewCard} style={AddSeedCardComponentStyle.CreateSeedComponentButton}>
                  <Animatable.Text animation='fadeIn' style={AddSeedCardComponentStyle.ModalButtonText}>Create Seed</Animatable.Text>
                </Button>
                <Button bordered style={AddSeedCardComponentStyle.JoinClusterComponentButton}>
                  <Animatable.Text animation='fadeIn' style={AddSeedCardComponentStyle.ModalButtonText}>Join Cluster</Animatable.Text>
                </Button>
                <Button bordered onPress={this.toggleModal} style={AddSeedCardComponentStyle.CloseModalButton}>
                  <Animatable.Text animation='fadeIn' style={AddSeedCardComponentStyle.ModalButtonText}>Close</Animatable.Text>
                </Button>
              </Animatable.View>
            </Animatable.View>
          </BlurView>
        </Modal>
      </Animatable.View>
    )
  }
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
    fontSize: 36,
    alignSelf: 'center',
    color: '#e16428',
    ...humanFont,
    ...sanFranciscoWeights.regular
  },
  AddSeedIconButton: {
    alignContent: 'center',
    alignSelf: 'auto',
    justifyContent: 'center',
    marginHorizontal: 30,
    borderRadius: 10,
    borderColor: '#414141'
  },
  AddSeedIcon: {
    color: '#e16428',
    width: 25,
    height: 25
  },
  CreateSeedComponentButton: {
    margin: 10,
    padding: 10,
    top: 15,
    borderRadius: 10,
    borderColor: '#f6e9e9'
  },
  JoinClusterComponentButton: {
    margin: 10,
    padding: 10,
    top: 15,
    borderRadius: 10,
    borderColor: '#f6e9e9'
  },
  CloseModalButton: {
    margin: 10,
    padding: 10,
    top: 15,
    borderRadius: 10,
    borderColor: '#fff'
  },
  ModalButtonText:
  {
    fontSize: 12,
    alignContent: 'center',
    alignSelf: 'auto',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#e16428',
    ...humanFont,
    ...sanFranciscoWeights.light,
    flex: 1
  },
  InputFields: {
    marginHorizontal: 20,
    padding: 10
  }
})

const mapDispatchToProps = dispatch => ({
  createCard: card => dispatch(createSeed(card)),
});

export default connect(null, mapDispatchToProps)(AddSeedComponent);