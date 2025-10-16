// function countOddPentaFib(n) {
//   return ~~((n - 1) / 6) + ~~((n - 2) / 6) + 1
// }

function countOddPentaFib(n) {
  const defaultArr = [0n, 1n, 1n, 2n, 4n]

  function* sequence() {
    let tempArr = defaultArr
    let y = 5

    for (let i = 0; i <+ tempArr.length; i++) {
      yield defaultArr[i]
    }

    while (true) {
      const nextVal = tempArr[y - 1] + tempArr[y - 2] + tempArr[y - 3] + tempArr[y - 4] + tempArr[y - 5]
      tempArr.push(nextVal)
      yield nextVal;
      y++
    }
  }

  const gen = sequence()
  const seen = new Set()

  for (let i = 0; i <= n; i++) {
    const num = gen.next().value
    if ((num & 1n) === 1n ) {
      seen.add(num)
    }
  }

  return seen.size
  // return oddArr.length
}