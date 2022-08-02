// https://leetcode.com/problems/valid-sudoku/

/**
 * @param {character[][]} board
 * @return {boolean}
 */
// O(n^2) time and space
var isValidSudoku = function (board) {
  const rows = {};
  const columns = {};
  const squares = {};
  const rowLength = board[0].length;
  const columnLength = board.length;

  // loop through each row, column and grid to see if there are duplicates
  for (let row = 0; row < rowLength; row++) {
    for (let column = 0; column < columnLength; column++) {
      const num = board[row][column];

      if (num === ".") {
        continue;
      }

      // Since there are 9 3 X 3 grids to know in which grid a number belongs to divide index by 3
      const grid = `${Math.floor(row / 3)}${Math.floor(column / 3)}`;

      if (!rows[row]) {
        rows[row] = new Set();
      }
      if (!columns[column]) {
        columns[column] = new Set();
      }
      if (!squares[grid]) {
        squares[grid] = new Set();
      }

      if (
        rows[row].has(num) ||
        columns[column].has(num) ||
        squares[grid].has(num)
      ) {
        return false;
      }

      rows[row].add(num);
      columns[column].add(num);
      squares[grid].add(num);
    }
  }

  return true;
};
