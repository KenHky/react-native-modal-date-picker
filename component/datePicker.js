import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  Text,
  Platform,
  PickerIOS,
} from 'react-native'
import PickerAndroid from 'react-native-picker-android'
let Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid
let PickerItem = Picker.Item

export default class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  render() {
    const { 
      Styles,
      group,
      value,
      onChange,
    } = this.props
    const selectValue = value[0] === "0" ? value.substr(1) : value
    return (
      <View style={Styles.pickerWheel}>
        <Picker
          selectedValue={selectValue}
          onValueChange={onChange}
        >
          {
            group.map((data,index)=>
              <PickerItem
                key={index}
                value={data}
                label={data}
              />
            )
        }
      </Picker>
    </View>
    )
  }
}