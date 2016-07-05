module.exports = (React,Components) => {
  const { Dimensions, StyleSheet } = Components;
  const window = Dimensions.get('window');

  return StyleSheet.create({
    modal: {
      width:window.width,
      height:window.height,
    },
    picker: {
      position:'absolute',
      bottom:0,
      left:0,
      height:300,
      width:window.width,
      backgroundColor:'rgba(255,255,255,0.8)',
    },
    pickerView: {
      height:300,
      width:window.width,
    },
    pickerWrap: {
      flexDirection: 'row',
      marginTop:20,
    },
    pickerWheel: {
      flex: 1
    },
    pickerToolbar: {
      height: 30,
      flexDirection: 'row',
      alignItems: 'center'
    },
    pickerCancelBtn: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginLeft: 20
    },
    pickerTitle: {
      flex: 4,
      color: 'black',
      textAlign: 'center'
    },
    pickerFinishBtn: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginRight: 20
    },
    pickerFinishBtnText: {
      fontSize: 16,
      color: '#FE751D'
    }
  });
};
