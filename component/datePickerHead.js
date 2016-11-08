import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'

export default class DatePickerHead extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  pickerCancel = () => {
    this.props.cancle()
  }
  pickerFinish = () => {
    this.props.finish()
  }
  render() {
    const { 
      Styles, 
      buttonColorStyle, 
      cancleText, 
      title,
      finishText,
    } = this.props
    return (
      <View style={[Styles.pickerToolbar]}>
        <View style={Styles.pickerCancelBtn}>
          <Text 
            style={[Styles.pickerFinishBtnText,buttonColorStyle]}
            onPress={this.pickerCancel}
          >
            {cancleText?cancleText:"取消"}
          </Text>
        </View>
        <Text style={[Styles.pickerTitle]} numberOfLines={1}>
          {title?title:"请选择日期"}
        </Text>
        <View style={Styles.pickerFinishBtn}>
            <Text 
              style={[Styles.pickerFinishBtnText,buttonColorStyle]}
              onPress={this.pickerFinish}
            >
              {finishText?finishText:"确定"}
            </Text>
        </View>
      </View>
    )
  }
}