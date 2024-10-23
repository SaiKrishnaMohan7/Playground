function searchMatrix(matrix: number[][], target: number): boolean {
  // Edge case: If the matrix is empty, return false
  if (matrix.length === 0 || matrix[0].length === 0) return false;

  const rows = matrix.length;
  const cols = matrix[0].length;
  let left = 0;
  let right = rows * cols - 1;

  // Binary search on the conceptual 1D array
  while (left <= right) {
      // Find the middle index in the 1D perspective
      const mid = Math.floor(left + (right - left) / 2);

      // Convert the 1D index 'mid' to a 2D coordinate (row, col)
      // 'row = mid / cols' gives the row number by seeing how many complete rows fit in the 'mid' index
      // 'col = mid % cols' gives the exact column in that row
      const midValue = matrix[Math.floor(mid / cols)][mid % cols];

      // Check if we've found the target
      if (midValue === target) {
          return true;
      } else if (midValue < target) {
          // If the middle value is less than the target, narrow the search to the right half
          left = mid + 1;
      } else {
          // If the middle value is greater than the target, narrow the search to the left half
          right = mid - 1;
      }
  }

  // If we exit the loop, the target was not found
  return false;
}