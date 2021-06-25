
exports.sortAsc = async (randomNumList) =>{
  tmp=randomNumList
  randomNumList.sort(function(a, b) {
    return a - b
  });
  sortNumList =tmp
  return sortNumList
}

exports.randomNumRangeListLen = async (list)=>{
    return randomNum = Math.floor(Math.random() * list.length)
}
