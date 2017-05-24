import React, { Component } from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native'
import PickerAndroid from 'react-native-picker-android'
import { DateModal, DatePickers, DatePickerHead } from './component'
import Styles from './style'
import moment from 'moment'
let nextID = 1

export default class DateTimePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalName:this.makeName (),
      nowDate: props.defaultData ? moment(props.defaultData).format('YYYY-MM-DD') : "",
      showModal: ''
    }
  }
  componentWillReceiveProps (nextProps) {
    if(nextProps.changeData && nextProps.changeData !== this.props.changeData) {
      this.setState({nowDate:nextProps.changeData.format('YYYY-MM-DD')})
    }
  }
  makeName () {
    return `modal-${nextID++}`
  }
  toggleModal = () => {
    if (this.state.openModal === this.state.modalName) {
      this.closeModal()
    } else {
      this.openModal(this.state.modalName);
    }
  }
  openModal = (modalName) => {
    this.setState({ openModal: modalName })
  }
  closeModal = () => {
    this.setState({ openModal:'' })
  }
  clickModal = () => {
    if (!this.props.keepShowModal) {
      this.closeModal()
    }
  }
  finishPicker = () => {
    const nowDate = this.pickerRef.getNewDate()
    this.setState({ openModal:'', nowDate })
    this.props.onChange && this.props.onChange(nowDate)
  }
  render () {
    const { 
      dateTextStyle, 
      modalColor, 
      pickerHeight,
      pickerColorStyle,
      buttonColorStyle,
      cancleText,
      title,
      finishText,
      type,
    } = this.props
    const { nowDate,openModal, modalName } = this.state
    const pickerHeightStyle = pickerHeight ? {height : pickerHeight} : {}
    return (
      <View>
        <TouchableOpacity onPress={this.toggleModal}>
          <Text style={dateTextStyle}>
            {nowDate?nowDate:"请选择日期"}
          </Text>
        </TouchableOpacity>
        <DateModal 
          Styles={Styles}
          onPress={this.clickModal} 
          visible={openModal === modalName} 
          modalColor={modalColor}
          pickerHeightStyle={pickerHeightStyle}
          pickerColorStyle={pickerColorStyle} 
        >
          <View>
            <DatePickerHead
              Styles={Styles}
              cancle={this.closeModal}
              finish={this.finishPicker}
              buttonColorStyle={buttonColorStyle} 
              cancleText={cancleText} 
              title={title}
              finishText={finishText}
            />
            <DatePickers 
              ref={r => this.pickerRef = r}
              pickerHeight={pickerHeight}
              Styles={Styles} 
              nowDate={nowDate || moment(new Date).format('YYYY-MM-DD')}
              type={type}
            />
          </View>
        </DateModal>
      </View>
    )
  }
}