

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Picker from 'react-native-modal-date-picker'
import moment from 'moment'

export default class rndemo extends Component {
  onChange (data) {
    console.log("new date",data)
  }
  render() {
    return (
      <View style={{marginTop:40}}>
        <Picker 
          onChange={this.onChange} 
          keepShowModal={true} 
          cancleText="cancle" 
          finishText="finish" 
          title="title" 
          modalColor="#000" 
          pickerHeight={400} 
          pickerColor="#fff" 
          buttonColor="#000"
          dateTextStyle={{color:'red'}}
        />
      </View>
    )
  }
}

AppRegistry.registerComponent('rndemo', () => rndemo)
