

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
        <Picker selectData={this.state.value} onSelect={this.onSelect.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
