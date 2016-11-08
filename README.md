# react-native-modal-date-picker
react native date picker 

### 1.0.0 版本更新

重构了组件的代码，语法更符合规范, 请使用 0.25+ 版本的 react native。

删除了 selectData, onSelect API，改用 defaultData 和 onChange 回调。

删除了 formater API, 因为目前只有日期选择，未来版本可能会加上时间选择。

增加了 dateTextStyle API。

### 简介
 
 这是一个 react-native 的时间选择器，使用了原生的 modal 和 picker 组件。
 支持 ios 和 android。
 
![](./pic/datepicker-ios.gif) 

### API
defaultData：默认初始值，请传入 YYYY-MM-DD 格式数据。(1.0.0新增)

onChange： 回调函数，参数为修改后的data值。(1.0.0新增)

dateTextStyle: 日期文字的样式。(1.0.0新增)

~~ selectData: 选择的值，通过onSelect回调修改，格式为“YYYY-MM-DD”。(1.0.0删除)

~~ onSelect： 回调函数，参数为修改后的data值。(1.0.0删除)

~~ formater： 显示的格式，默认为“YYYY-MM-DD”，可参考[moment](http://momentjs.com/)修改。(1.0.0删除)

cancleText： 取消的文本，默认为“取消”。

finishText： 确定的文本，默认为“确定”。

title： 组件标题，默认为“请选择日期”。

modalColor： modal层的颜色，默认为“rgba(0,0,0,0.4)”。

pickerColor： 组件的颜色，默认为“rgba(255,255,255,0.8)”。

buttonColor： 确定和取消按钮的颜色，默认为“#FE751D”。

pickerHeight： 组件的高度，默认为400。

keepShowModal： 点击组件外的modal层是否不关闭组件，默认关闭组件。值为true或false。

### 安装
    npm install react-native-modal-date-picker --save
    
###使用

```javascript
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
          defaultData={moment(new Date).format('YYYY-MM-DD')} 
          onChange={this.onChange} 
          keepShowModal={true} 
          cancleText="cancle" 
          finishText="finish" 
          title="title" 
          modalColor="#000" 
          pickerHeight={400} 
          pickerColor="#fff" 
          buttonColor="#000"
        />
      </View>
    )
  }
}

AppRegistry.registerComponent('rndemo', () => rndemo)
```


###协议
MIT
