import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import RNPicker from 'rn-modal-picker'
import * as Animatable from 'react-native-animatable'
import { humanFont, sanFranciscoWeights } from 'react-native-typography'

export default class SetTimeIntervalPickerModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      TimeIntervals: [
        {
          id: 0,
          name: '30 Seconds',
          time_interval: 'THIRTY_SECONDS'
        },
        {
          id: 1,
          name: '1 Minute',
          time_interval: 'ONE_MINUTE'
        },
        {
          id: 2,
          name: '2 Minutes',
          time_interval: 'TWO_MINUTES'
        },
        {
          id: 3,
          name: '5 Minutes',
          time_interval: 'FIVE_MINUTES'
        },
        {
          id: 4,
          name: '10 Minutes',
          time_interval: 'TEN_MINUTES'
        },
        {
          id: 5,
          name: '15 Minutes',
          time_interval: 'FIFTEEN_MINUTES'
        },
        {
          id: 6,
          name: '20 Minutes',
          time_interval: 'TWENTY_MINUTES'
        },
        {
          id: 7,
          name: '30 Minutes',
          time_interval: 'THIRTY_MINUTES'
        },
        {
          id: 8,
          name: '1 Hour',
          time_interval: 'ONE_HOUR'
        }
      ],
      placeHolderText: 'Enter Time Interval',
      selectedText: ''
    }
  }

  _selectedValue (index, item) {
    this.setState({ selectedText: item.name })
  }

  render () {
    return (
      <View style={SetTimeIntervalPickerModalStyle.Container}>
        <RNPicker
          dataSource={this.state.TimeIntervals}
          dummyDataSource={this.state.TimeIntervals}
          defaultValue={false}
          showSearchBar
          disablePicker={false}
          changeAnimation='fade'
          searchBarPlaceHolder='Enter an Interval'
          showPickerTitle={false}
          searchBarContainerStyle={SetTimeIntervalPickerModalStyle.SearchBarContainer}
          pickerStyle={SetTimeIntervalPickerModalStyle.PickerBox}
          itemSeparatorStyle={SetTimeIntervalPickerModalStyle.ItemDivider}
          pickerItemTextStyle={SetTimeIntervalPickerModalStyle.ListElementText}
          selectedLabel={this.state.selectedText}
          placeHolderLabel={this.state.placeHolderText}
          selectLabelTextStyle={SetTimeIntervalPickerModalStyle.SelectedLabelText}
          placeHolderTextStyle={SetTimeIntervalPickerModalStyle.PlaceholderText}
          dropDownImageStyle={SetTimeIntervalPickerModalStyle.DropDownIcon}
          selectedValue={(index, item) => this._selectedValue(index, item)}
        />
      </View>
    )
  }
}

const SetTimeIntervalPickerModalStyle = StyleSheet.create({
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
    marginBottom: 2,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 2,
    flexDirection: 'row'
  }
})
