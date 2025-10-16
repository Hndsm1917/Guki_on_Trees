export const puzzle = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
];

function findMrv(matrix) {
    const collection = new Map()
    let bestCell = null

    for (let i = 0; i <= matrix.length - 1; i++) {
        let rows = []
        for (let y = 0; y <= matrix[i].length - 1; y++) {
            if (matrix[i][y] === 0) {
                rows.push(y)
            }
        }

        collection.set(`${i}`, rows)
    }

    for (const [key, value] of collection) {
        const opts = () => {

        }
    }

    return 1
}

export function solveSudoku(puzzle) {
    const mrv = findMrv(puzzle)
    // let mrv = []
    //
    // for (let i= 0; i <= puzzle.length - 1; i++) {
    //     const arr = puzzle[i].filter((num) => num !== 0)
    //     mrv.push(arr)
    // }
    //
    // console.log(mrv)
}

export default {puzzle, solveSudoku}