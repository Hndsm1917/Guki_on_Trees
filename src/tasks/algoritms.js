export function insertionSort(arr) {
    for (let j = 1; j <= arr.length - 1; j++) {
        const key = arr[j]
        let i = j - 1

        while(i >= 0 && arr[i] > key) {
            arr[i + 1] = arr[i]
            i--
        }

        arr[i + 1] = key
    }

    return arr
}

export function push(arr, elem) {
    arr[arr.length] = elem
}

export function pop(arr) {
    if (arr.length === 0) return undefined
    const lastElem = arr[arr.length - 1]
    arr.length -= 1
    return lastElem
}

export function reduce(arr, callback, initialValue) {
    if (typeof callback !== 'function') {
        throw new TypeError('ti eblan функцию давай')
    }

    console.log(arguments)
}

// Seed https://www.youtube.com/watch?v=5EmcmY5rJiQ&list=RD5EmcmY5rJiQ&start_radio=1
// Algoritm seed-ecb
// Service https://encode-decode.com/seed-ecb-encrypt-online/