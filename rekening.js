function format(S) {
  let arr = []
  for(let i = 0; i < S.length; i++){
      arr.push(S[i])
  }
  let filtered = arr.filter(el => el !== ' ' && el !== '-')
  if(filtered.length % 3 === 0 || filtered.length % 3 === 2){
    let result =  filtered.join('')
    let regex = result.match(/.{1,3}/g).join('-')
    return regex
  }
  else if(filtered.length % 3 === 1){
    let popOne = filtered.pop() // angka terakhir
    let popTwo = filtered.pop() // angka kedua dari belakang
    let str = filtered.join('')
    let regex = str.match(/.{1,3}/g).join('-')
    return regex + `-${popTwo}${popOne}`
  }
}

console.log(format("01-44 48 5755 8368"));
console.log(format("0 - 22 1485--351"));
console.log(format("555672653"));
console.log(format("555672653213131333031"));

