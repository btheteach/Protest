import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import RNPicker from 'rn-modal-picker'
import { humanFont, sanFranciscoWeights } from 'react-native-typography'

export default class SetRadioChannelPickerModel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      RadioChannels: [
        {
          id: 0,
          name: 'Join Any'
        },
        {
          id: 1,
          name: 'Channel 1'
        },
        {
          id: 2,
          name: 'Channel 2'
        }
      ],
      placeHolderText: 'Enter Radio Channel',
      selectedText: ''
    }
  }

  _selectedValue (index, item) {
    this.setState({ selectedText: item.name })
  }

  render () {
    return (
      <View style={SetRadioChannelPickerModalStyle.Container}>
        <RNPicker
          dataSource={this.state.RadioChannels}
          dummyDataSource={this.state.RadioChannels}
          defaultValue={false}
          showSearchBar
          disablePicker={false}
          changeAnimation='fade'
          searchBarPlaceHolder='Enter a Radio Channel'
          showPickerTitle={false}
          searchBarContainerStyle={SetRadioChannelPickerModalStyle.SearchBarContainer}
          pickerStyle={SetRadioChannelPickerModalStyle.PickerBox}
          itemSeparatorStyle={SetRadioChannelPickerModalStyle.ItemDivider}
          pickerItemTextStyle={SetRadioChannelPickerModalStyle.ListElementText}
          selectedLabel={this.state.selectedText}
          placeHolderLabel={this.state.placeHolderText}
          selectLabelTextStyle={SetRadioChannelPickerModalStyle.SelectedLabelText}
          placeHolderTextStyle={SetRadioChannelPickerModalStyle.PlaceholderText}
          dropDownImageStyle={SetRadioChannelPickerModalStyle.DropDownIcon}
          selectedValue={(index, item) => this._selectedValue(index, item)}
        />
      </View>
    )
  }
}

const SetRadioChannelPickerModalStyle = StyleSheet.create({
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
    padding: 10
  },
  ItemDivider: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#D3D3D3'
  },
  SearchBarContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#e16428',
    borderRadius: 10,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10
  },
  DropDownIcon: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: 'center'
  },
  SelectedLabelText: {
    fontSize: 18,
    color: '#f6e9e9',
    top: 10,
    paddingBottom: 12,
    paddingLeft: 4.1,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
    ...humanFont,
    ...sanFranciscoWeights.bold
  },
  PlaceholderText: {
    fontSize: 18,
    color: '#f6e9e9',
    top: 10,
    paddingBottom: 12,
    paddingLeft: 4.1,
    textAlign: 'left',
    width: '99%',
    flexDirection: 'row',
    ...humanFont,
    ...sanFranciscoWeights.bold
  },
  ListElementText: {
    color: '#181818',
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: 'left',
    ...humanFont,
    ...sanFranciscoWeights.bold
  },
  PickerBox: {
    marginLeft: 18,
    elevation: 3,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 2,
    flexDirection: 'row',
    bottom: 13
  }
})
