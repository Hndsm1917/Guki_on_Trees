function solution(number) {
    if (number < 0) return 0

    let nums = 0

    for (let i = 0; i <= number; i++) {
        if ((i % 3 === 0 || i % 5 === 0) && i < number ) {
            nums += i

            debugArr.push(i)
        }
    }

    return nums
}

export default solution