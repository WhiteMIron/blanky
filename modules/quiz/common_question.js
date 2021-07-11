
exports.sortAsc = async (randomNumList) =>{
  tmp=randomNumList
  randomNumList.sort(function(a, b) {
    return a - b
  });
  sortNumList =tmp
  return sortNumList
}

exports.randomNumRangeListLen = async (listLength)=>{
    return randomNum = Math.floor(Math.random() * listLength)
}
