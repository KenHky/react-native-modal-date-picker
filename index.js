const React = require('react-native')
const {
    PropTypes,
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
    Platform,
    PickerIOS
} = require('react-native')
let nextID = 1;
import PickerAndroid from 'react-native-picker-android';
let Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;
let PickerItem = Picker.Item;

const moment = require('moment');

const Styles = require('./style')(React,{ Dimensions, StyleSheet });



const DateTimePicker = React.createClass({
    getInitialState() {
        return {
            dateData: this.createDateData(),
            openModal:'',
            modalName:this.makeName (),
            yearWheelData:[],
            yearSelectData:'',
            monthWheelData:[],
            monthSelectData:'',
            dayWheelData:[],
            daySelectData:'',
        }
    },
    componentDidMount () {
        var defaultData = {}
        if (this.props.selectData) {
            defaultData= this.returnDefaultData(this.props.selectData)
        } else {
            defaultData= this.returnDefaultData(moment().format('YYYY-MM-DD hh:mm:ss'))
        }
        console.log(defaultData)
        this.setState(defaultData)
    },

    componentWillReceiveProps(newProps){
        let newState = {}
        if (this.props.selectData!=newProps.selectData) {
            newState = this.returnDefaultData(newProps.selectData);
        }
        this.setState(newState);
    },

    returnDefaultData (selectData) {
        var reg = /(\d{4})-(\d{2})-(\d{2})/
        if (reg.test(selectData)) {
            return {
                yearWheelData: Object.keys(this.state.dateData),
                yearSelectData: RegExp.$1 + "年",
                monthSelectData: (RegExp.$2[0]==0?RegExp.$2[1]:RegExp.$2)+'月',
                daySelectData: (RegExp.$3[0]==0?RegExp.$3[1]:RegExp.$3)+'日',
                monthWheelData: Object.keys(this.state.dateData[(RegExp.$1 + "年")]),
                dayWheelData: this.state.dateData[(RegExp.$1 + "年")][((RegExp.$2[0]==0?RegExp.$2[1]:RegExp.$2)+'月')],
            }

        }
        return {}
    },

    openModal (menuName) {
        this.setState({openModal:menuName})
    },
    closeModal () {
        this.setState({openModal:''})
    },
    clickModal () {
    },


    createDateData (){
        let date = {};
        for(let i=1950;i<2050;i++){
            let month = {};
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    if (((i % 4)==0) && ((i % 100)!=0) || ((i % 400)==0)){
                        for(let k=1;k<30;k++){
                            day.push(k+'日');
                        }
                    }else {
                        for(let k=1;k<29;k++){
                            day.push(k+'日');
                        }
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                month[j+'月'] = day;
            }
            date[i+'年'] = month;
        }
        return date;
    },

    toggleModal () {
        if (this.state.openModal==this.state.modalName) {
            this.closeModal();
        } else {
            this.openModal(this.state.modalName);
        }
        console.log('openModal.....',this.state.openModal)
    },
    makeName () {
        return `modal-${nextID++}`;
    },
    onPress (value) {
        this.props.onSelect(value);
    },
    getText () {
        return `${this.state.yearSelectData.replace(/[^0-9]/ig,"")}-${this.state.monthSelectData.replace(/[^0-9]/ig,"").length==1?('0'+this.state.monthSelectData.replace(/[^0-9]/ig,"")):this.state.monthSelectData.replace(/[^0-9]/ig,"")}-${this.state.daySelectData.replace(/[^0-9]/ig,"").length==1?('0'+this.state.daySelectData.replace(/[^0-9]/ig,"")):this.state.daySelectData.replace(/[^0-9]/ig,"")}`
    },

    _pickerFinish() {
        const dateText = this.getText();
        this.closeModal();
        this.onPress(dateText);

    },
    _pickerCancel () {
        this.closeModal()
    },

    returnDatePicker () {
        return (
            <View style={[Styles.pickerWrap]}>
                <View style={Styles.pickerWheel}>
                    <Picker
                        selectedValue={this.state.yearSelectData}
                        onValueChange={value => {
                            this.setState({
                                yearSelectData: value,
                                dayWheelData:this.state.dateData[value][this.state.monthSelectData],
                                daySelectData:this.state.dateData[value][this.state.monthSelectData].findIndex((d)=>d==this.state.daySelectData)>-1?this.state.daySelectData:this.state.dateData[value][this.state.monthSelectData][this.state.dateData[value][this.state.monthSelectData].length-1],
                            });
                        }} >
                            {
                                this.state.yearWheelData.map((year,index)=>
                                    (
                                        <PickerItem
                                            key={index}
                                            value={year}
                                            label={year}
                                        />
                                    )
                                )
                            }
                    </Picker>
                </View>
                <View style={Styles.pickerWheel}>
                    <Picker
                        selectedValue={this.state.monthSelectData}
                        onValueChange={value => {
                            this.setState({
                                monthSelectData: value,
                                dayWheelData:this.state.dateData[this.state.yearSelectData][value],
                                daySelectData:this.state.dateData[this.state.yearSelectData][value].findIndex((d)=>d==this.state.daySelectData)>-1?this.state.daySelectData:this.state.dateData[this.state.yearSelectData][value][this.state.dateData[this.state.yearSelectData][value].length-1],
                            });
                        }} >
                            {
                                this.state.monthWheelData.map((month,index)=>
                                    (
                                        <PickerItem
                                            key={index}
                                            value={month}
                                            label={month}
                                        />
                                    )
                                )
                            }
                    </Picker>
                </View>
                <View style={Styles.pickerWheel}>
                    <Picker
                        selectedValue={this.state.daySelectData}
                        onValueChange={value => {
                            this.setState({
                                daySelectData:value
                            });
                        }} >
                            {
                                this.state.dayWheelData.map((day,index)=>
                                    (
                                        <PickerItem
                                            key={index}
                                            value={day}
                                            label={day}
                                        />
                                    )
                                )
                            }
                    </Picker>
                </View>
            </View>
        )
    },

    render () {
        const {openModal,modalName} = this.state
        const modalBackgroundStyle = {
              backgroundColor: 'rgba(0,0,0,0.4)',
            };
        return (
            <View>
                <TouchableOpacity onPress={this.toggleModal}>
                    <Text>{this.props.selectData?moment(this.props.selectData).format(this.props.formater||'YYYY-MM-DD'):"请选择日期"}</Text>
                </TouchableOpacity>
                {
                    openModal==modalName?(
                        <Modal animated={false} visible={true} transparent={true}>
                            <TouchableOpacity style={[Styles.modal,modalBackgroundStyle]} onPress={this.closeModal}>
                                <View style={[Styles.picker]}>
                                    <TouchableWithoutFeedback style={[Styles.pickerView]} onPress={this.clickModal}>
                                        <View style={[Styles.pickerView]}>
                                            <View style={[Styles.pickerToolbar]}>
                                                <View style={Styles.pickerCancelBtn}>
                                                    <Text style={[Styles.pickerFinishBtnText]}
                                                        onPress={this._pickerCancel}>取消</Text>
                                                </View>
                                                <Text style={[Styles.pickerTitle]} numberOfLines={1}>
                                                    请选择日期
                                                </Text>
                                                <View style={Styles.pickerFinishBtn}>
                                                    <Text style={[Styles.pickerFinishBtnText]}
                                                        onPress={this._pickerFinish}>确定</Text>
                                                </View>
                                            </View>
                                            {this.returnDatePicker()}
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    ):null
                }
            </View>

        )
    }
})
export default DateTimePicker
