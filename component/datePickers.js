import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  Text,
  Dimensions,
} from 'react-native'
import DatePicker from './datePicker'
import { getYear, getMonth, getDay, getDayGroup } from './util'
const yuarGroup = []
for(let i=1950;i<2050;i++){
  yuarGroup.push(i.toString())
}

export default class DatePickers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedYear: getYear(props.nowDate),
      selectedMonth: getMonth(props.nowDate),
      selectedDay: getDay(props.nowDate),
      monthGroup: ['1','2','3','4','5','6','7','8','9','10','11','12'],
      dayGroup: getDayGroup(props.nowDate),
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.nowDate && nextProps.nowDate != this.props.nowDate) {
      this.setState({
        selectedYear: getYear(nextProps.nowDatee),
        selectedMonth: getMonth(nextProps.nowDate),
        selectedDay: getDay(nextProps.nowDate),
      })
    }
  }
  getNewDate = () => {
    const { selectedYear, selectedMonth, selectedDay } = this.state
    return `${selectedYear}-${selectedMonth}-${selectedDay}`
  }
  changeYear = (value) => {
    const { selectedMonth, selectedDay } = this.state
    const dayGroup = getDayGroup(`${value}-${selectedMonth}-${selectedDay}`)
    this.setState({
      selectedYear: value,
      dayGroup,
      selectedDay: dayGroup.findIndex(d => d === selectedDay) > -1 ? selectedDay : dayGroup[dayGroup.length-1]
    })
  }
  changeMonth = (value) => {
    const { selectedYear, selectedDay } = this.state
    let data = value
    if (value.length === 1) {
      data = `0${value}`
    }
    const dayGroup = getDayGroup(`${selectedYear}-${value}-${selectedDay}`)
    this.setState({
      selectedMonth: data,
      dayGroup,
      selectedDay: dayGroup.findIndex(d => d === selectedDay) > -1 ? selectedDay : dayGroup[dayGroup.length-1]
    })
  }
  changeday = (value) => {
    let data = value
    if (value.length === 1) {
      data = `0${value}`
    }
    this.setState({
      selectedDay: data
    })
  }
  render() {
    const { 
      Styles, 
    } = this.props
    const {
      monthGroup,
      dayGroup,
      selectedYear,
      selectedMonth,
      selectedDay,
    } = this.state
    return (
      <View style={[Styles.pickerWrap]}>
        <DatePicker 
          Styles={Styles} 
          group={yuarGroup} 
          value={selectedYear} 
          onChange={this.changeYear} 
        />
        <DatePicker 
          Styles={Styles} 
          group={monthGroup} 
          value={selectedMonth} 
          onChange={this.changeMonth} 
        />
        <DatePicker 
          Styles={Styles} 
          group={dayGroup} 
          value={selectedDay} 
          onChange={this.changeday}  
        />
      </View>
    )
  }
}