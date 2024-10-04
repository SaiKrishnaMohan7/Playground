// 853. Car Fleet: https://leetcode.com/problems/car-fleet/description/

function carFleet(target: number, position: number[], speed: number[]): number {
  // pair up car position and speed
  // and sort them by descending order of position
  const carPositionAndSpeed = position.map((position, idx) => [position, speed[idx]]).sort((a, b) => b[0] - a[0]);

  const fleetStack: number[] = [];

  for(let [position, speed] of carPositionAndSpeed) {
      // calculate time taken by each car to reach target
      let timeToTargetForCurrentCar = (target - position) / speed;

      // if currentCar takes more time to reach the target than the previous car (whose time is on the stack, top of stack)
      if (fleetStack.length == 0 || timeToTargetForCurrentCar > fleetStack[fleetStack.length - 1]) {
          // Add the slower car time to stack thereby creating a fleet (current car will make a fleet with the previous car, since descending order of position wrt target)
          fleetStack.push(timeToTargetForCurrentCar) ;
      }
  }

  return fleetStack.length


};



/**
 * Determines how many car fleets will arrive at the destination.
 *
 * A car fleet is a group of cars that travel together to the destination. A car fleet is formed when a car catches up to
 * another car or when a car is traveling slower than the car in front of it. This function calculates the number of such
 * car fleets. A single car can also be considered a fleet composed of itself.
 *
 * The process:
 * 1. The car farthest from the destination will always form its own fleet since no cars are behind it.
 * 2. Each car before that will either:
 *    - Form its own fleet if it travels slower than the car in front (meaning it won't catch up).
 *    - Join a fleet with the car in front of it if it catches up or is traveling slower, merging into the same fleet.
 *    - Be joined by cars behind it (if it's not the last car and cars behind it are slower or traveling at the same speed).
 */