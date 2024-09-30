//874 https://leetcode.com/problems/walking-robot-simulation

function robotSim(commands: number[], obstacles: number[][]): number {
  let x = 0;
  let y = 0;
  let directionIndex = 0; // Start facing North
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]; // North, East, South, West
  let squaredMaxDistanceCovered = 0;
  let obstacleMap = new Set();

  // Store obstacles as strings in the format "x,y"
  for (let obstacle of obstacles) {
    obstacleMap.add(`${obstacle[0]},${obstacle[1]}`);
  }

  for (let op of commands) {
    if (op == -1) {
      // Right turn (clockwise)
      directionIndex = (directionIndex + 1) % 4; // prevent overflow (array index out of bounds)
    } else if (op == -2) {
      // Left turn (counter-clockwise)
      directionIndex = (directionIndex + 3) % 4;
    } else {
      // Move forward 'op' steps
      const [dx, dy] = directions[directionIndex];
      for (let i = 0; i < op; i++) {
        const newX = x + dx;
        const newY = y + dy;

        // Check if there's an obstacle at the new position
        if (obstacleMap.has(`${newX},${newY}`)) {
          break;
        }

        // Update position
        x = newX;
        y = newY;

        // Calculate squared distance and update the maximum
        squaredMaxDistanceCovered = Math.max(
          squaredMaxDistanceCovered,
          x * x + y * y
        );
      }
    }
  }

  return squaredMaxDistanceCovered;
}

/**
 * Directions Array:
 *
 * In the array-based solution, the directions are stored in this order:
 *
 * const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // North, East, South, West
 *
 * Each index corresponds to a direction:
 *
 *     0: North
 *     1: East
 *     2: South
 *     3: West
 *
 * Turning Right (op == -1):
 *
 *     Turning right means moving clockwise to the next direction in the array.
 *     So, if the robot is facing North (directionIndex = 0), turning right moves it to East (directionIndex = 1).
 *     To achieve this, you simply add 1 to the current directionIndex and take the result modulo 4 (to wrap around if the index exceeds 3).
 *
 * Thus, the formula for turning right is:
 *
 * directionIndex = (directionIndex + 1) % 4;
 *
 * For example:
 *
 *     North (0) → East (1)
 *     East (1) → South (2)
 *     South (2) → West (3)
 *     West (3) → North (0)
 *
 * Turning Left (op == -2):
 *
 *     Turning left means moving counterclockwise to the previous direction in the array.
 *     If the robot is facing North (directionIndex = 0), turning left moves it to West (directionIndex = 3).
 *     To achieve this, instead of subtracting 1 (which could result in negative indices), you add 3 to the current directionIndex and take the result modulo 4.
 *     Adding 3 is equivalent to subtracting 1 in modular arithmetic.
 *
 * Thus, the formula for turning left is:
 *
 * directionIndex = (directionIndex + 3) % 4;
 *
 * For example:
 *
 *     North (0) → West (3)
 *     West (3) → South (2)
 *     South (2) → East (1)
 *     East (1) → North (0)
 *
 * Why +3 Instead of -1?
 *
 *     If you were to subtract 1 directly from directionIndex, you'd have to handle negative numbers.
 *     Modular arithmetic in JavaScript doesn’t handle negative numbers well, so instead of subtracting, you can add the equivalent positive number
 *     (in this case, +3 is the same as -1 mod 4). This approach avoids the complication of negative indices.
 *
 * In Summary:
 *
 *     op == -1: Turn right by moving to the next direction (directionIndex + 1).
 *     op == -2: Turn left by moving to the previous direction, which is achieved by adding 3 (directionIndex + 3).
 */
