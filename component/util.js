export const getYear = (data) => {
  let year = ''
  if (data) {
    year = data.substr(0, 4)
  }
  return year
}
export const getMonth = (data) => {
  let month = ''
  if (data) {
    month = data.substr(5, 2)
  }
  return month
}
export const getDay = (data) => {
  let day = ''
  if (data) {
    day = data.substr(8, 2)
  }
  return day
}

export const getDayGroup = (data) => {
  let dayGroup = []
  if (data) {
    const year = parseInt(data.substr(0, 4), 10)
    const month = parseInt(data.substr(5, 2), 10)
    if(month === 2){
      if (((year % 4)==0) && ((year % 100)!=0) || ((year % 400)==0)){
        for(let k=1;k<30;k++){
          dayGroup.push(k.toString());
        }
      }else {
        for(let k=1;k<29;k++){
          dayGroup.push(k.toString());
        }
      }
    }
    else if(month in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
      for(let k=1;k<32;k++){
        dayGroup.push(k.toString());
      }
    }
    else{
      for(let k=1;k<31;k++){
        dayGroup.push(k.toString());
      }
    }
  }
  return dayGroup
}