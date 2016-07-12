

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Picker from 'react-native-modal-date-picker'
import moment from 'moment'

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment(new Date).format('YYYY-MM-DD')
    };
  }
  onSelect (value) {
    this.setState({value:value})   
  }

  render() {
    return (
      <View style={{marginTop:40}}>
        <Picker selectData={this.state.value} onSelect={this.onSelect.bind(this)} formater="YYYY-MM-DD hh:mm:ss" cancleText="cancle" finishText="finish" title="title" modalColor="#000" keepShowModal={true} pickerHeight={400} pickerColor="#fff" buttonColor="#000"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
