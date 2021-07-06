let str = "abcd"
let tmp = ["abc", "a", "bb","acc","attain", "arrow","a","ac"]

excludeWord ="a"
console.log(tmp.indexOf("ac"))
for(t of tmp){
  console.log(t)
  index=t.indexOf("a")
  //이 index를 무시해야함 a만을 찾아야해
  console.log(index)
  console.log("t[index+t.length]:",t.substring(index,excludeWord.length))
  word = t.substring(index,excludeWord.length)
  if(word==t){
    console.log("일치함")
  }
  else
    console.log("불일치함")
}
