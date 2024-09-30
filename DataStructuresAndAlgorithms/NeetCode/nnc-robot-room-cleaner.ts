// 489. https://leetcode.com/problems/robot-room-cleaner/

/**
 * class Robot {
 *      // Returns true if the cell in front is open and robot moves into the cell.
 *      // Returns false if the cell in front is blocked and robot stays in the current cell.
 * 		move(): boolean {}
 *
 *      // Robot will stay in the same cell after calling turnLeft/turnRight.
 *      // Each turn will be 90 degrees.
 * 		turnRight() {}
 *
 *      // Robot will stay in the same cell after calling turnLeft/turnRight.
 *      // Each turn will be 90 degrees.
 * 		turnLeft() {}
 *
 * 		// Clean the current cell.
 * 		clean(): {}
 * }
 */

const directions: number[][] = [[0,1], [1,0], [0, -1], [-1, 0]]; // N, E, S, W
const visited = new Set();

function goBack(robot: Robot) {
    // Turn the robot 180 degrees
    robot.turnRight();
    robot.turnRight();
    // Move back one step
    robot.move();
    // Turn the robot back to its original direction
    robot.turnRight();
    robot.turnRight();
}

function backtrack(robot: Robot, x: number, y: number, dirIndex: number) {
    // Add the position we are visiting to Set
    const positionKey = `${x},${y}`;
    visited.add(positionKey);
    robot.clean();

    for (let i = 0; i < 4; i++) {
        const newDirIndex = (dirIndex + i) % 4;
        const [dx, dy] = directions[newDirIndex];
        const newX = x + dx;
        const newY = y + dy;

        if(!visited.has(`${newX},${newY}`) && robot.move()){
            // We have not visted this coordinate and there is no obstacle
            backtrack(robot, newX, newY, newDirIndex);

            // go back to og position after exploring
            goBack(robot);
        }

        robot.turnRight();
    }
}

function cleanRoom(robot: Robot) {
    backtrack(robot, 0, 0, 0);
};